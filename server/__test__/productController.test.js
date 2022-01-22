const app = require("../");
const request = require("supertest");
const { User, DetailProduct, Product } = require("../models")
const { getToken } = require("../helpers/jwt");

let tokenMatch1, tokenPayloadInvalid, clientToken
const list = [
  {
    "title": "Chat consultation", 
    "type": "Ticket Chat"
  },
  {
    "title": "Booking consultation", 
    "type": "Ticket Booking"
  },
  {
    "title": "LipCare", 
    "type": "Lip Mouisturizer"
  },
  {
    "title": "Cleanser", 
    "type": "Face Wash"
  }
]

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Product.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await DetailProduct.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  
    
  // /! USER1
  let newAdmin = {
    email: "newAdmin@gmail.com",
    password: "newAdmin",
    role: "Admin",
  };

  let newClient = {
    email: "newClient@gmail.com",
    password: "newClient",
    role: "Client",
  }; 
    
  try {
    const createdUser = await User.create(newAdmin);
    let payload1 = {
      id: createdUser.id,
      email: createdUser.email,
    };
    tokenMatch1 = getToken(payload1);

    const createdClient = await User.create(newClient);
    let payload2 = {
      id: createdClient.id,
      email: createdClient.email,
    };
    clientToken = getToken(payload2);
    
    let wrongPayload = {
      id: 1000,
      email: "wrongEmail@gmail.com",
    };
    tokenPayloadInvalid = getToken(wrongPayload);
  } catch (err) {
    console.log(err);
  }
})

describe("show product Client", () => {
  //TODO 1 show product empty
  test("don't have product", (done) => {
    request(app)
      .get("/products")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 show product success
  test("success show product", (done) => {
    request(app)
      .get("/products")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object))
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

    //TODO 3 show product failed
    test("failed show product", (done) => {
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('message', "Pleae Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 4 show product not authorized
    test("show product not authorized", (done) => {
      request(app)
        .get("/products")
        .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty('message', "Invalid token")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
})

describe("show product by id Client", () => {
  //TODO 1 don't have product by id
  test("don't have product by id", (done) => {
    request(app)
      .get("/products/9")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Product not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 show product success
  test.only("success show product", (done) => {
    request(app)
      .get("/products/1")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
  //TODO 3 show product failed no access_token
  test("failed show product no access_token", (done) => {
    request(app)
      .get("/products")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Pleae Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 4 show product not authorized
  test("show product not authorized", (done) => {
    request(app)
      .get("/products")
      .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

})
  
describe("add product", () => {
  //TODO 1 success add product
  test("success create ", (done) => {
    request(app)
    .post("/cms/products")
    .set('access_token', tokenMatch1)
    .send ({
      title: "chat consultation",
      type: "ticket chat"
    })
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(201)
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })


  //TODO 2 add title is empty
  test("add title is empty should be return invalid response", (done) => {
    request(app)
      .post("/cms/products")
      .set("access_token", tokenMatch1)
      .send({
        title: "",
        type: "ticket chat"
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Title is required");
        done();
      }) 
      .catch((err) => {
        done(err);
      });
  });

  //TODO 3 add title is null
  test("add title is null should be return invalid response", (done) => {
    request(app)
      .post("/cms/products")
      .set("access_token", tokenMatch1)
      .send({
        type: "ticket chat"
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Title is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 4 add type is empty
  test("add type is empty should be return invalid response", (done) => {
    request(app)
      .post("/cms/products")
      .set("access_token", tokenMatch1)
      .send({
        title: "Title",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Type is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 5 add type is null
  test("add type is null should be return invalid response", (done) => {
    request(app)
      .post("/cms/products")
      .set("access_token", tokenMatch1)
      .send({
        title: "ticket chat"
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Type is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

})

// describe("show product admin", () => {
//   //TODO 1 show product
//   test("don't have product", (done) => {
//     request(app)
//       .get("/cms/products")
//       .set("access_token", tokenMatch1)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(expect.any(Object));
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   //TODO 2 show product
//   test("success show product", (done) => {
//     request(app)
//       .get("/cms/products")
//       .set("access_token", tokenMatch1)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(expect.any(Object))
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
  
// })

// describe("show product by id admin", () => {
//   //TODO 1 don't have product by id
//   test("don't have product by id", (done) => {
//     request(app)
//       .get("/cms/products/9")
//       .set("access_token", tokenMatch1)
//       .then((res) => {
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual(expect.any(Object));
//         expect(res.body).toHaveProperty("message", "Product not found");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   //TODO 2 show product
//   test("success show product", (done) => {
//     request(app)
//       .get("/cms/products/1")
//       .set("access_token", tokenMatch1)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(expect.any(Object));
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
  
// })

describe("update product", () => {
  //TODO 1 success update product
  test("success update ", (done) => {
    request(app)
    .put("/cms/products/1")
    .set('access_token', tokenMatch1)
    .send ({
      title: "chat consultation",
      type: "ticket chat"
    })
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(200)
      done()
    })     
    .catch((err => {
      done(err)
    }))
  })


  // TODO 2 edit title is empty
  test("edit title is empty should be return invalid response", (done) => {
    request(app)
    .put("/cms/products/1")
    .set("access_token", tokenMatch1)
      .send({
        title: "",
        type: "ticket chat"
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Title is required");
        done();
      }) 
      .catch((err) => {
        done(err);
      });
  });

  //TODO 3 edit title is null
  test("update title is null ", (done) => {
    request(app)
    .put("/cms/products/1")
    .set('access_token', tokenMatch1)
    .send ({
      type: "ticket chat"
    })
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(400)
      expect(resp.body).toHaveProperty("message", "Title is required");
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })
  
    // TODO 4 edit type is empty
    test("edit type is empty should be return invalid response", (done) => {
      request(app)
      .put("/cms/products/1")
      .set("access_token", tokenMatch1)
        .send({
          title: "ticket chat",
          type: "",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Type is required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 5 edit type is null
    test("update type is null ", (done) => {
      request(app)
      .put("/cms/products/1")
      .set('access_token', tokenMatch1)
      .send ({
        title: "ticket chat"
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(400)
        expect(resp.body).toHaveProperty("message", "Type is required");

        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    test("update not found ", (done) => {
      request(app)
      .put("/cms/products/7")
      .set('access_token', tokenMatch1)
      .send ({
        title: "ticket chat",
        type: "ticket"
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        expect(resp.body).toHaveProperty("message", "Product not found");

        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

})

describe("delete product", () => {


    test('Success Case', done => {
      Product.bulkCreate (list)
      .then(newaData => {
        done()
      }).catch(err => {
        done(err)
      })
      request(app)
      .delete(`/cms/products/3`)
      .set("access_token", tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', "Success Delete Product")
        done()
      })
    })

    test('Unauthorized Access Token Case', done => {
      
      Product.bulkCreate (list)
      .then(newaData => {
        done()
      }).catch(err => {
        done(err)
      })
      request(app)
      .delete(`/cms/products/3`)
      .set('access_token', tokenPayloadInvalid)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('message', "Invalid token")
        done()
      })
    })

    test('No Access Token Case', done => {
      Product.bulkCreate (list)
      .then(newaData => {
        done()
      }).catch(err => {
        done(err)
      })
      request(app)
      .delete(`/cms/products/3`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('message', "Invalid token")
        done()     
      })
    })

    test('no product Case', (done) => {
      request(app)
      .delete(`/cms/products/30`)
      .set("access_token", tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', "Product not found")
        done()
      })
    })
})


describe("show product by id Client", () => {
  //TODO 1 don't have product by id
  test("don't have product by id", (done) => {
    request(app)
      .get("/cms/details/9")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Product not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 show product details
  test("success show product by id", (done) => {
    request(app)
      .get("/cms/details/1")
      .set("access_token", clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
})




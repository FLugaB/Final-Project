const app = require("../");
const request = require("supertest");
const { User, DetailProduct, Product } = require("../models")
const { getToken } = require("../helpers/jwt");

let tokenMatch1, tokenPayloadInvalid, clientToken
const list = [
  
  {
    "title": "Booking consultation", 
    "type": "Ticket Booking",
    "name": "Ticket Booking",
    "price": 300000,
    "category": "Ticket",
    "stock": 0,
    "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
    "description": "Ticket Counsultation via Chat"
  },
  {
    "title": "LipCare", 
    "type": "Lip Mouisturizer",
    "name": "VASELINE Lip Theraphy Jar",
    "price": 31000,
    "category": "Lip care",
    "stock": 4,
    "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
    "description": "Vaseline Lip Therapy dari USA dengan kandungan Petroleum Jelly yang memberikan kelembaban pada bibir. Gunakan setiap hari untuk mengurangi bibir kering dan pecah-pecah serta menjaga kesehatan bibir. Simpan ditempat sejuk dan hindari dari paparan matahari langsung.Jika terjadi iritasi pada bibir harap hentikan penggunaan produk Oleskan lip care secara merata di bibir.How to Use : Gunakan sebelum memakai lipstick, atau kapanpun ketika bibir terasa kering.Ingredients : Petrolatum; Butyrospermum Parkii (Shea) Butter; Tocopheryl Acetate"
  },
  {
    "title": "Cleanser", 
    "type": "Face Wash",
    "name": "Senka - Perfect Whip",
    "price": 29000,
    "category": "Facewash",
    "stock": 5,
    "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
    "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik untuk menciptakan busa yang lembut, tebal dan melimpah yang mampu membersihkan make-up, kotoran dan minyak berlebih dengan halus."
  }
]
beforeAll(async () => {
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

  describe("add product", () => {
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

    //TODO 1 success add product
    test("success create ", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', tokenMatch1)
      .send ({
          "title": "Chat consultation", 
          "type": "Ticket Chat",
          "name": "Ticket Consultation",
          "price": 240000,
          "category": "Ticket",
          "stock": 0,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Ticket Counsultation via Chat"
        
      })
      .then((resp) => {
        console.log(resp,">>>>>>>>ini re");
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(201)
        done()
      })   
      .catch((err => {
        console.log (err,">>>>>>>>>>>>err")
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
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
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
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
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
          type: "",
          name: "Ticket Consultation",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
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
          title: "ticket chat",
          name: "Ticket Consultation",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          console.log(res.body,"<<<<<RESPONSE");
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Type is Required");
          done();
        })
        .catch((err) => {
          console.log(err,"TESTING ERROR");
          done(err);
        });
    });

    //TODO 6 add name is empty
    test("add name is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Name is required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 7 add name is null
    test("add name is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Name is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 8 price type is empty
    test("price type is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 0,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price can't be 0");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    
    //TODO 9 add price is null
    test("add price is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "ticket",
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 10 add price is less than 1
    test("add price is less than 1 should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 0,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price can't be 0");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    
    
    //TODO 9 add stock is null
    test("add stock is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "ticket",
          category: "Ticket",
          price: 50000,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "DetailProduct.stock cannot be null");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 10 add stock is less than 0
    test("add price is less than 1 should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 100000,
          category: "Ticket",
          stock: -1,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Stock can't be lower then 0");
          done();
        })
        .catch((err) => {
          done(err);
        }); 
    });

    //TODO 2 add category is empty
    test("add category is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 240000,
          category: "",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Category is required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 3 add category is null
    test("add category is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          type: "ticket chat",
          name: "Ticket Consultation",
          price: 240000,
          title: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: "Ticket Counsultation via Chat"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Category is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
      //TODO 4 add ImageUrl is empty
      test("add ImageUrl is empty should be return invalid response", (done) => {
        request(app)
          .post("/cms/products")
          .set("access_token", tokenMatch1)
          .send({
            title: "Title",
            type: "ticket",
            name: "Ticket Consultation",
            price: 240000,
            category: "Ticket",
            stock: 0,
            imageUrl: "",
            description: "Ticket Counsultation via Chat"
          })
          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(expect.any(Object));
            expect(res.body).toHaveProperty("message", "Image is required");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    
      //TODO 5 add image is null
      test("add image is null should be return invalid response", (done) => {
        request(app)
          .post("/cms/products")
          .set("access_token", tokenMatch1)
          .send({
            title: "ticket chat",
            name: "Ticket Consultation",
            price: 240000,
            category: "Ticket",
            stock: 0,
            type: "ticket",
            description: "Ticket Counsultation via Chat"
          })
          .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(expect.any(Object));
            expect(res.body).toHaveProperty("message", "Image is required");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });

    //TODO 6 add description is empty
    test("add description is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          name: "ticket konsultasi",
          price: 240000,
          category: "Ticket",
          stock: 0,
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          description: ""
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Description is required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 7 add description is null
    test("add description is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          title: "ticket",
          type: "ticket chat",
          price: 240000,
          category: "Ticket",
          stock: 0,
          name: "ticket konsultasi",
          imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Description is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 1 no access_token add product
    test("no access_token add product ", (done) => {
      request(app)
      .post("/cms/products")
      .send ({
          "title": "Chat consultation", 
          "type": "Ticket Chat",
          "name": "Ticket Consultation",
          "price": 240000,
          "category": "Ticket",
          "stock": 0,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Ticket Counsultation via Chat"
        
      })
      .then((resp) => {
        console.log(resp,">>>>>>>>ini re");
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        done()
      })   
      .catch((err => {
        console.log (err,">>>>>>>>>>>>err")
        done(err)
      }))
    })

    //TODO 1 no access_token add product
    test("no invalid access_token add product ", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', 'fjj566ff')
      .send ({
          "title": "Chat consultation", 
          "type": "Ticket Chat",
          "name": "Ticket Consultation",
          "price": 240000,
          "category": "Ticket",
          "stock": 0,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Ticket Counsultation via Chat"
        
      })
      .then((resp) => {
        console.log(resp,">>>>>>>>ini re");
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(401)
        done()
      })   
      .catch((err => {
        console.log (err,">>>>>>>>>>>>err")
        done(err)
      }))
    })
  })
  


describe("show product Client", () => {
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
  test("success show product", (done) => {
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

    test.only('no product Case', (done) => {
      request(app)
      .delete(`/cms/products/30`)
      .set("access_token", tokenMatch1)
      .end((err, res) => {
      console.log("%c 🙍‍♂️: err ", "font-size:16px;background-color:#919ab1;color:white;", err)
      console.log("%c 🇧🇮: res ", "font-size:16px;background-color:#7cc94b;color:white;", res.body)
        if (err) return done(err)
        expect(res.status).toBe(404)
        // expect(res.body).toHaveProperty('message', "Product not found")
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




const app = require("../");
const request = require("supertest");
const { User, DetailProduct, Product } = require("../models")
const { getToken } = require("../helpers/jwt");

let tokenMatch1, tokenPayloadInvalid, clientToken
const list = [
  {
    "title": "Chat consultation", 
    "type": "Ticket Chat",
    "name": "Ticket Consultation",
    "price": 300000,
    "category": "Ticket",
    "stock": 1,
    "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
    "description": "Ticket Counsultation via Chat"
  },
  {
    "title": "Booking consultation", 
    "type": "Ticket Booking",
    "name": "Ticket Booking",
    "price": 31000,
    "category": "Ticket",
    "stock": 1,
    "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
    "description": "Vaseline Lip Therapy dari USA dengan kandungan Petroleum Jelly yang memberikan kelembaban pada bibir. Gunakan setiap hari untuk mengurangi bibir kering dan pecah-pecah serta menjaga kesehatan bibir. Simpan ditempat sejuk dan hindari dari paparan matahari langsung"
  },
  {  
    "title": "Skincare Product", 
    "type": "Barang Baru",
    "name": "2VASELINE Lip Theraphy Jar",
    "price": 45000,
    "category": "Lip care",
    "stock": 3,
    "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
    "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
  }

]

const product  = [
  {
    "title": "Chat consultation", 
    "type": "Ticket Chat"
  },
  {
    "title": "Booking consultation", 
    "type": "Ticket Booking"
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
  await DetailProduct.bulkCreate(list)
  await Product.bulkCreate(product)

  // DOCTOR
  const newDoctor  = {
    email: "doctor@gmail.com",
    password: "doctor",
    role: "Doctor"
  }
  try {
    const result = User.create(newDoctor) 
  } catch (err) {
    console.log(err);
  }

  // ADMIN
  let newAdmin = {
    email: "newAdmin@gmail.com",
    password: "newAdmin",
    role: "Admin",
  };

  // CUSTOMER
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
    //TODO 21 success add product
    test("add product success create ", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', tokenMatch1)
      .send ({  
          "title": "Skincare Product", 
          "type": "Product Skincare",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
    //TODO 22 failed add product
    test("add product failed create exist product", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', tokenMatch1)
      .send ({  
        "title": "Chat consultation", 
        "type": "Ticket Chat",
        "name": "Ticket Consultation",
        "price": 300000,
        "category": "Ticket",
        "stock": 1,
        "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
        "description": "Ticket Counsultation via Chat"
      })
      .then((resp) => {
        expect(resp.status).toBe(403);
        expect(resp.body).toEqual(expect.any(Object));
        expect(resp.body).toHaveProperty("message", "Product is Exist, Please Only Add to Detail Product Refer to this Product Id");
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 1 no access_token add product
    test("add product no access_token", (done) => {
      request(app)
      .post("/cms/products")
      .send ({
        "title": "Skincare Product", 
        "type": "Product Skincare",
        "name": "VASELINE Lip Theraphy Jar",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        // expect(res.body).toHaveProperty("message", "Please Login first")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 2 invalid access_token add product
    test("add product invalid access_token", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', 'fjj566ff')
      .send ({
        "title": "Skincare Product", 
        "type": "Product Skincare",
        "name": "VASELINE Lip Theraphy Jar",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(401)
        // expect(res.body).toHaveProperty("message", "Invalid token")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 3 forbidden access_token add product
    test("add product forbidden access_token", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', clientToken)
      .send ({
        "title": "Skincare Product", 
        "type": "Product Skincare",
        "name": "VASELINE Lip Theraphy Jar",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "Invalid access")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 4 add title is empty
    test("add product title is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 5 add title is null
    test("add product title is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 6 add type is empty
    test("add product type is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Type is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 7 add type is null
    test("add product type is null should be return invalid response", (done) => {
      request(app)
      .post("/cms/products")
      .set("access_token", tokenMatch1)
      .send({
        "title": "Skincare Product", 
        "name": "VASELINE Lip Theraphy Jar",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Type is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 8 add name is empty
    test("add product name is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 9 add name is null
    test("add product name is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 10 price type is empty
    test("add product price is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 0,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
    
    //TODO 11 add price is null
    test("add product price is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

    //X TODO 12 add price is less than 1 WHY DOUBLE TEST?
    test("add product price is less than 1 should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 0,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

    //TODO 13 add stock is null
    test("add product stock is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Stock is required");
          // expect(res.body).toHaveProperty("message", "DetailProduct.stock cannot be null");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 14 add stock is less than 0
    test("add product stock is less than 1 should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": -3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

    //TODO 15 add category is empty
    test("add product category is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 16 add category is null
    test("add product category is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 17 add ImageUrl is empty
    test("add product ImageUrl is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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
  
    //TODO 18 add image is null
    test("add product ImageUrl is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

    //TODO 19 add description is empty
    test("add product description is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": ""
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
  
    //TODO 20 add description is null
    test("add product description is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/products")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "Barang New 2",
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097"
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

    
  })

   ///// CUSTOMER
  describe("show products client", () => {
    //TODO 1 show products no access_token
    test("show products no access_token", (done) => {
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('message', "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 2 show products not authorized
    test("show products not authorized", (done) => {
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
    
    //TODO 3 show products success
    test("show products success", (done) => {
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
  })

  describe("show product byId client", () => {
    //TODO 1 show product no access_token
    test("show product byId no access_token", (done) => {
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('message', "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 2 show product not authorized
    test("show product byId not authorized", (done) => {
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

    //TODO 3 not found product
    test("show product byId not found product", (done) => {
      request(app)
        .get("/products/999")
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
  
    //TODO 4 show product success
    test("show product byId success ", (done) => {
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
    
    
  
  })

  ///// ADMIN
  describe("show products admin", () => {
    //TODO 1 show products no access_token
    test("show products no access_token", (done) => {
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('message', "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 2 show products not authorized
    test("show products not authorized", (done) => {
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
    
    //TODO 3 show products success
    test("show products success", (done) => {
      request(app)  
        .get("/products")
        .set("access_token", tokenMatch1)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(expect.any(Object))
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  })
  
  describe("show product byId admin", () => {
    //TODO 1 show product no access_token
    test("show product byId no access_token", (done) => {
      request(app)
        .get("/products")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toHaveProperty('message', "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 2 show product not authorized
    test("show product byId not authorized", (done) => {
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
  
    //TODO 3 not found product
    test("show product byId not found product", (done) => {
      request(app)
        .get("/products/999")
        .set("access_token", tokenMatch1)
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
  
    //TODO 4 show product success
    test("show product byId success ", (done) => {
      request(app)
        .get("/products/1")
        .set("access_token", tokenMatch1)
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

  describe("update detail", () => {
    
    //TODO 1 no access_token update detail
    test("update detail no access_token", (done) => {
      request(app)
      .put("/cms/details/3")
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 2 invalid access_token update detail
    test("update detail invalid access_token", (done) => {
      request(app)
      .put("/cms/details/3")
      .set('access_token', 'fjj566ff')
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(401)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 3 forbidden access_token update detail
    test("update detail forbidden access_token", (done) => {
      request(app)
      .put("/cms/details/3")
      .set('access_token', clientToken)
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "Invalid access")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 4 update name is empty
    test("update detail name is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Name is Required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });

    // TODO 5 update name is null
    test("update detail name is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Name is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 6 price type is empty
    test("update detail price is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 0,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price can't be 0 or < Rp. 9.999");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 7 update price is null
    test("update detail price is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    // TODO 8 update price is less than Rp. 9.999
    test("update detail price is less than Rp. 9.999 should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 8999,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Price can't be 0 or < Rp. 9.999");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 9 update stock is null
    test("update detail stock is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

    //TODO 10 update stock is less than 0
    test("update detail stock is less than 1 should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": -3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Stock can't be lower than 1");
          done();
        })
        .catch((err) => {
          done(err);
        }); 
    });

    //TODO 11 update category is empty
    test("update detail category is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Category is Required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });

    //TODO 12 update category is null
    test("update detail category is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Category is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 13 update ImageUrl is empty
    test("update detail ImageUrl is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Image is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 14 update image is null
    test("update detail ImageUrl is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Image is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 15 update description is empty
    test("update detail description is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
          "description": ""
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Description is Required");
          done();
        }) 
        .catch((err) => {
          done(err);
        });
    });

    //TODO 16 update description is null
    test("update detail description is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/details/4")
        .set("access_token", tokenMatch1)
        .send({
          "name": "VASELINE Lip Theraphy Jar",
          "price": 45000,
          "category": "Lip care",
          "stock": 3,
          "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097"
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Description is Required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 17 success updated detail
    test("updated detail success", (done) => {
      request(app)
      .put("/cms/details/4")
      .set('access_token', tokenMatch1)
      .send ({
          "name": "3 VASELINE Lip Theraphy Jar Baru",
          "price": 299999,
          "category": "Lip care",
          "stock": 1,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        
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

    // TODO 18 not found updated id detail
    test("updated detail id not found", (done) => {
      request(app)
      .put("/cms/details/30")
      .set('access_token', tokenMatch1)
      .send ({
          "name": "3 VASELINE Lip Theraphy Jar Baru",
          "price": 299999,
          "category": "Lip care",
          "stock": 1,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        
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

    // TODO 19 success updated detail ticket
    test("updated detail ticket success", (done) => {
      request(app)
      .put("/cms/details/1")
      .set('access_token', tokenMatch1)
      .send ({
          "name": "1 VASELINE Lip Theraphy Jar Baru",
          "price": 599999,
          "category": "Lip care",
          "stock": 1,
          "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
          "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
        
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
    
  })

  describe("delete detail", () => {
      
    //TODO 1 no access_token delete detail
    test('delete detail no access_token', done => {
      request(app)
      .delete(`/cms/details/3`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(403)
        expect(res.body).toHaveProperty('message', "Please Login first")
        done()     
      })
    })
    
    //TODO 2 invalid access_token delete detail
    test('delete detail invalid access_token', done => {
      request(app)
      .delete(`/cms/details/3`)
      .set('access_token', 'hhihhi8887h')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('message', "Invalid token")
        done()
      })
    })

    //TODO 3 forbidden access_token delete detail
    test('delete detail forbidden access_token', done => {
      request(app)
      .delete(`/cms/details/3`)
      .set('access_token', clientToken)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(403)
        expect(res.body).toHaveProperty('message', "Invalid access")
        done()
      })
    })
    
    //TODO 4 not found detail
    test('delete detail id not found', (done) => {
      request(app)
      .delete(`/cms/details/999`)
      .set("access_token", tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', "Product not found")
        done()
      })
    })

    //TODO 5 not found id delete detail
    test("delete detail no id", (done) => {
      request(app)
      .delete("/cms/details/")
      .set('access_token', tokenMatch1)
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })


    
    // //TODO 6 cannot delete this detail
    // test("delete detail is not allowed", (done) => {
    //   request(app)
    //   .delete("/cms/details/2")
    //   .set('access_token', tokenMatch1)
    //   .then((resp) => {
        
    //     expect(resp.body).toEqual(expect.any(Object))
    //     expect(resp.status).toBe(200)
    //     expect(resp.body).toHaveProperty("message", "You Can't Delete This Product");
    //     done()
    //   })   
    //   .catch((err => {
    //     done(err)
    //   }))
    // })

    //TODO 7 success delete detail
    test('delete detail success', done => {
      request(app)
      .delete(`/cms/details/3`)
      .set('access_token', tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', "Success Delete Product")
        done()
      })
    })
  })  

  describe("add detail", () => {
  
    //TODO 1 no access_token add detail
    test("add detail no access_token", (done) => {
      request(app)
      .post("/cms/details")
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 2 invalid access_token add detail
    test("add detail invalid access_token", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', 'fjj566ff')
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(401)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 3 forbidden access_token add detail
    test("add detail forbidden access_token", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', clientToken)
      .send ({
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "Invalid access")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 4 product id not found
    test("add detail product id not found", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', tokenMatch1)
      .send ({
        // "ProductId": "",
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        expect(resp.body).toHaveProperty("message", "Product Id is Required")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 5 product is not found
    test("add detail product is not found", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', tokenMatch1)
      .send ({
        "ProductId": 999,
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        expect(resp.body).toHaveProperty("message", "Product not found")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 6 product id not found
    test("add detail product id not found", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', tokenMatch1)
      .send ({
        // "ProductId": "",
        "name": "VASELINE Baru 2",
        "price": 45000,
        "category": "Lip care",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        expect(resp.body).toHaveProperty("message", "Product Id is Required")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    // //TODO 5 cannot add ticket product again
    // test("add detail cannot add ticket product again", (done) => {
    //   request(app)
    //   .post("/cms/details")
    //   .set('access_token', tokenMatch1)
    //   .send ({
    //     "ProductId": 1,
    //     "name": "VASELINE Baru 2",
    //     "price": 45000,
    //     "category": "Lip care",
    //     "stock": 3,
    //     "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
    //     "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
    //   })
    //   .then((resp) => {
    //     expect(resp.body).toEqual(expect.any(Object))
    //     expect(resp.status).toBe(403)
    //     expect(resp.body).toHaveProperty("message", "Ticket Product is Exist, Please Only Add Skincare Product")
    //     done()
    //   })   
    //   .catch((err => {
    //     done(err)
    //   }))
    // })

    //TODO 7 add product success
    test("add detail success", (done) => {
      request(app)
      .post("/cms/details")
      .set('access_token', tokenMatch1)
      .send ({
        "ProductId": 3,
        "name": "VASELINE Baru Detail",
        "price": 45000,
        "category": "Lip care Baru Detail",
        "stock": 3,
        "imageUrl": "https://images.soco.id/b85bac8d-38ac-4506-b49e-fca873c46609-image-0-1629982004097",
        "description": "Facial Foam ini mengandung White Cocoon Essence kualitas terbaik."
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

  })

  describe("update product", () => {
    
    //TODO 1 no access_token update product
    test("update product no access_token", (done) => {
      request(app)
      .put("/cms/products/3")
      .send ({
        "title": "Skincare Product 2", 
        "type": "Product Skincare New",
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 2 invalid access_token update product
    test("update product invalid access_token", (done) => {
      request(app)
      .put("/cms/products/3")
      .set('access_token', 'fjj566ff')
      .send ({
        "title": "Skincare Product 2", 
        "type": "Product Skincare New",
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(401)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 3 forbidden access_token update product
    test("update product forbidden access_token", (done) => {
      request(app)
      .post("/cms/products")
      .set('access_token', clientToken)
      .send ({
        "title": "Skincare Product 2", 
        "type": "Product Skincare New",
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "Invalid access")
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
    
    //TODO 4 update title is empty
    test("update product title is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/products/3")
        .set("access_token", tokenMatch1)
        .send({
          "title": "", 
          "type": "Product Skincare New",
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
  
    //TODO 5 update title is null
    test("update product title is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/products/3")
        .set("access_token", tokenMatch1)
        .send({
          "type": "Product Skincare New",
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

    //TODO 6 update type is empty
    test("update product type is empty should be return invalid response", (done) => {
      request(app)
        .put("/cms/products/3")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
          "type": "",
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

    //TODO 7 update type is null
    test("update product type is null should be return invalid response", (done) => {
      request(app)
        .put("/cms/products/3")
        .set("access_token", tokenMatch1)
        .send({
          "title": "Skincare Product", 
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

    //TODO 8 not found product
    test("update product id not found", (done) => {
      request(app)
      .put("/cms/products/999")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Skincare Product", 
        "type": "Product Skincare", 
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

    //TODO 9 not found id update product
    test("update product no id", (done) => {
      request(app)
      .put("/cms/products/")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Skincare Product", 
        "type": "Product Skincare", 
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 10 cannot update this product
    test("update product is not allowed", (done) => {
      request(app)
      .put("/cms/products/1")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Chat consultation", 
        "type": "Ticket Chat", 
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "You Can't Update This Product");
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 11 cannot update this product
    test("update product is not allowed", (done) => {
      request(app)
      .put("/cms/products/2")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Booking consultation", 
        "type": "Ticket Booking", 
      })
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "You Can't Update This Product");
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 12 success updated product
    test("update product success", (done) => {
      request(app)
      .put("/cms/products/3")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Skincare Product 2", 
        "type": "Product Skincare", 
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
    
  })

  describe("delete product", () => {
  
    //TODO 1 no access_token delete product
    test('delete product no access_token', done => {
      request(app)
      .delete(`/cms/products/3`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(403)
        expect(res.body).toHaveProperty('message', "Please Login first")
        done()     
      })
    })
    
    //TODO 2 invalid access_token delete product
    test('delete product invalid access_token', done => {
      request(app)
      .delete(`/cms/products/3`)
      .set('access_token', 'hhihhi8887h')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('message', "Invalid token")
        done()
      })
    })
  
    //TODO 3 forbidden access_token delete product
    test('delete product forbidden access_token', done => {
      request(app)
      .delete(`/cms/products/3`)
      .set('access_token', clientToken)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(403)
        expect(res.body).toHaveProperty('message', "Invalid access")
        done()
      })
    })
    
    //TODO 4 not found product
    test('delete product id not found', (done) => {
      request(app)
      .delete(`/cms/products/999`)
      .set("access_token", tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('message', "Product not found")
        done()
      })
    })

    //TODO 5 not found id delete product
    test("delete product no id", (done) => {
      request(app)
      .delete("/cms/products/")
      .set('access_token', tokenMatch1)
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(404)
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })
  
    //TODO 6 cannot delete this product
    test("delete product is not allowed", (done) => {
      request(app)
      .delete("/cms/products/1")
      .set('access_token', tokenMatch1)
      .then((resp) => {
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(403)
        expect(resp.body).toHaveProperty("message", "You Can't Delete This Product");
        done()
      })   
      .catch((err => {
        done(err)
      }))
    })

    //TODO 7 success delete product
    test('delete product success', done => {
      request(app)
      .delete(`/cms/products/3`)
      .set('access_token', tokenMatch1)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', "Success Delete Product")
        done()
      })
    })

    //TODO 8 show products not found
    test("don't have product", async () => {
      await Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
      const res = await request(app)
        .get(`/products`)
        .set("access_token", tokenMatch1)
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Product not found");
    });
  })

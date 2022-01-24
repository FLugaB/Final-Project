
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
          expect(res.body).toHaveProperty("message", "DetailProduct.stock cannot be null");
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
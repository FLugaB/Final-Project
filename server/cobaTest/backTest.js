


    //TODO 4 add name is empty
    test("add detail name is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    // TODO 5 add name is null
    test("add detail name is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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
    test("add detail price is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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
          expect(res.body).toHaveProperty("message", "Price can't be 0");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 7 add price is null
    test("add detail price is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    // TODO 8 add price is less than Rp. 9.999
    test("add detail price is less than Rp. 9.999 should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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
          expect(res.body).toHaveProperty("message", "Price can't be 0");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    //TODO 9 add stock is null
    test("add detail stock is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 10 add stock is less than 0
    test("add detail stock is less than 1 should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 11 add category is empty
    test("add detail category is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 12 add category is null
    test("add detail category is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 13 add ImageUrl is empty
    test("add detail ImageUrl is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 14 add image is null
    test("add detail ImageUrl is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 15 add description is empty
    test("add detail description is empty should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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

    //TODO 16 add description is null
    test("add detail description is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/details")
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
      .post("/cms/details")
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
        console.log(resp,">>>>>>>>ini re");
        expect(resp.body).toEqual(expect.any(Object))
        expect(resp.status).toBe(200)
        done()
      })   
      .catch((err => {
        console.log (err,">>>>>>>>>>>>err")
        done(err)
      }))
    })

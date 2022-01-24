

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

    //TODO 6 cannot delete this detail
    test("delete detail is not allowed", (done) => {
      request(app)
      .delete("/cms/details/1")
      .set('access_token', tokenMatch1)
      .send ({
        "title": "Chat consultation", 
        "type": "Ticket Chat", 
      })
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

    //TODO 7 success delete detail
    // test('delete detail success', done => {
    //   request(app)
    //   .delete(`/cms/details/3`)
    //   .set('access_token', tokenMatch1)
    //   .end((err, res) => {
    //     if (err) return done(err)
    //     expect(res.status).toBe(200)
    //     expect(res.body).toHaveProperty('message', "Success Delete Product")
    //     done()
    //   })
    // })
  })
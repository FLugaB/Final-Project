const app = require("../app");
const request = require("supertest");
const { User, DetailProduct, Product } = require("../models")
const { getToken } = require("../helpers/jwt");

let tokenMatch1

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  // await Product.destroy({ truncate: true, cascade: true, restartIdentity: true})

  let newAdmin = {
    email: "newAdmin@gmail.com",
    password: "newAdmin",
    role: "Admin",
  };
    
  try {
    const createdUser = await User.create(newAdmin);
    let payload1 = {
      id: createdUser.id,
      email: createdUser.email,
    };
    tokenMatch1 = getToken(payload1);

  } catch (err) {
    console.log(err,"<<<< DI BERFORE ALL");
  }
})

  describe("add product", () => {
    test("success create ", (done) => {
      // Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
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
        // console.log(resp,">>>>>>>>ini re");
        expect(resp.status).toBe(201)
        expect(resp.body).toEqual(expect.any(Object))
        done()
      })   
      .catch((err => {
        // console.log (err,">>>>>>>>>>>>err")
        done(err)
      }))
    })

    test("don't have product", async () => {
      await Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
      request(app)
        .get("/products")
        .set("access_token", tokenMatch1)
        .then((res) => {
        console.log("%c 🦅: res if not found ", "font-size:16px;background-color:#d9ef35;color:black;", res.body)
          
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message", "Product not found");
          // done();
        })
        .catch((err) => {
          console.log(err,"<<<<<< ERROR");
          // done(err);
        });
    });

    it("don't have product", async () => {
      await Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
      const res = await request(app)
        .get(`/products`)
        .set("access_token", tokenMatch1)
      console.log("MASUK");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Product not found");

      // const result = await testIt('delete', `/users/${userByEmail.body._id}`);
      // expect(result).toEqual([401, 403, 401, 200]);
    });
  
  })
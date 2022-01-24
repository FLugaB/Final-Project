const app = require("../");
const request = require("supertest");
const { User, OrderProduct, Product, DetailProduct } = require("../models");
const { getToken } = require("../helpers/jwt");

const defaultImage =
  "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332";

let tokenMatch1, tokenMatch2, adminToken, tokenPayloadInvalid, doctorToken;
let invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJjaW5keVZAZ21haWwuY29tIiwiaWF0IjoxNjQyNjAzMzQ1fQ.bx0MAXaSmsYCa3Qbac8KQpCftEzKtFgpr8I96I1xZed";

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await OrderProduct.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  let newClientTest = {
    email: "newClient1@gmail.com",
    password: "newClient",
    role: "Client",
  };

  let data = [
    {
      userId: 1,
      ProductId: 2,
      status: "completed"
    }
  ]
  
  const product  = 
{
  "title": "Chat consultation", 
  "type": "Ticket Chat"
}
const detail = 
{
  "ProductId": 1,
  "name": "Ticket Chat",
  "price": 300000,
  "category": "Ticket",
  "stock": 0,
  "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
  "description": "Ticket Counsultation via Chat"
}  
const getProduct = await Product.create(product);
const getDetail = await DetailProduct.create(detail);


  try {
    const createdClient = await User.create(newClientTest);
    let payload1 = {
      id: createdClient.id,
      email: createdClient.email,
    };

    tokenMatch1 = getToken(payload1);
      const createdDoctor = await User.create(newDoctor);
      let payload3 = {
        id: createdDoctor.id,
        email: createdDoctor.email,
      };
      doctorToken = getToken(payload3)
  } catch (err) {
    console.log(err);
  }
})

describe("add client cart Test on clientCard Field", () => {

  //TODO 1 success add product
  test("success create ", (done) => {
    request(app)
    .post("/account/client-cart/1")
    .set('access_token', tokenMatch1)
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(201)
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })

  // TODO 1 show cart invalid id product
  test("don't have product", (done) => {
    request(app)
    .post(`/account/client-cart/17`)
    .set("access_token", tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty('message', "Product not found")
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
    
  //TODO 1 no accessToken
  test("New Client Test no access-token", (done) => {
    request(app)
      .post("/account/client-cart/1")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

  //TODO 1 invalid access_token add product
  test(" invalid access_token add product ", (done) => {
    request(app)
    .post("/account/client-cart/1")
    .set('access_token', 'fjj566ff')
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(401)
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })
})

describe("delete client cart Test on clientCard Field", () => {

  //TODO 1 success delete product
  test("success delete ", (done) => {
    request(app)
    .delete("/account/client-cart/1")
    .set('access_token', tokenMatch1)
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.body).toHaveProperty("message", "Success Delete Product")
      expect(resp.status).toBe(200)
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })

  //TODO 1 no accessToken
  test("New Client Test no access-token", (done) => {
    request(app)
      .delete("/account/client-cart/1")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

  //TODO 1 invalid access_token add product
  test(" invalid access_token add product ", (done) => {
    request(app)
    .delete("/account/client-cart/1")
    .set('access_token', 'fjj566ff')
    .then((resp) => {
      expect(resp.body).toEqual(expect.any(Object))
      expect(resp.status).toBe(401)
      done()
    })   
    .catch((err => {
      done(err)
    }))
  })

  // TODO 1 show cart invalid id product
  test("don't have product", (done) => {
    request(app)
    .delete(`/account/client-cart/17`)
    .set("access_token", tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(401);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty('message', "Order not found")
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
})
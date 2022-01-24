const app = require("../");
const request = require("supertest");
const { Product,User, DetailProduct, OrderProduct, Transaction, Voucher } = require("../models");
const { getToken } = require("../helpers/jwt");

let tokenMatch1,getOrder, tokenPayloadInvalid, clientToken
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
  }
]

const product  = [
  {
    "title": "Chat consultation", 
    "type": "Ticket Chat"
  }
]

const order = [
  {
    "UserId" : 2,
    "ProductId": 1,
    "status": "pending"
  },
  {
    "UserId" : 3,
    "ProductId": 1,
    "status": "completed"
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
    const getOrder = await OrderProduct.create(order);
    

  } catch (err) {
    console.log(err);
  }
})

describe ("client cart", () => {

  //TODO 1 create order product for consultation no order yet
  test("create order product for consultation no order yet", (done) => {
    request(app)
    .get("/account/cart")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toEqual({ msg: "there is no orders yet" });
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 create order product 
    test("create order product ", (done) => {
      request(app)
      .get("/account/cart")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ msg: "there is no orders yet" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    test("create order product for consultation no order yet", (done) => {
      request(app)
      .get("/account/cart")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ message: "Please Login first" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    test("create order product for consultation no order yet", (done) => {
      request(app)
      .get("/account/cart")
      .set('access_token', 'cdds6f')
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ message: "Invalid token" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })
})

describe ("client detail checkout", () => {

  //TODO 1 create order product for consultation no order yet
  test("create order product for consultation no order yet", (done) => {
    request(app)
    .get("/account/detail-checkout")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toEqual({ msg: "there is no orders yet" });
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 create order product 
    test("create order product ", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ msg: "there is no orders yet" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    test("create order product for consultation no access token", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ message: "Please Login first" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    test("create order product for consultation not authorize", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .set('access_token', 'cdds6f')
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ message: "Invalid token" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })
})

// describe("ticket consultation", () => {

//   test("create order product for consultation", (done) => {
//     request(app)
//         .post("/products/chat")
//         .set('access_token', tokenMatch1)
//         .then((res) => {
//           expect(res.status).toBe(201);
//           expect(res.body).toEqual(expect.any(Object));
//           expect(res.body).toEqual({ msg: "Checkout first before you could chat with our doctor" });
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//   })

// })

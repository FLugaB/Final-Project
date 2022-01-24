const app = require("../");
const request = require("supertest");
const { Product,User, DetailProduct, OrderProduct, Transaction, Voucher } = require("../models");
const { getToken } = require("../helpers/jwt");

let tokenMatch1,getOrder, tokenPayloadInvalid, clientToken

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

const order = [
  {
    "UserId" : 3,
    "ProductId": 1,
    "status": "pending"
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
  await OrderProduct.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

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
    const getProduct = await Product.create(product);
    const getDetail = await DetailProduct.create(detail);
    

  } catch (err) {
    console.log(err);
  }
})

describe("ticket consultation", () => {

  test("create order product for consultation", (done) => {
    request(app)
        .post("/products/chat")
        .set('access_token', tokenMatch1)
        .then((res) => {
          console.log(res,">>>>>>>>>>ini res");
          expect(res.status).toBe(201);
          expect(res.body).toEqual(expect.any(Object));
          done();
        })
        .catch((err) => {
          console.log(err, "ini err");
          done(err);
        });
  })

  test("create order productfail no access_token for consultation", (done) => {
    request(app)
        .post("/products/chat")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toEqual({
            message: "Please Login first",
          });
          done();
        })
        .catch((err) => {
          console.log(err, "ini err");
          done(err);
        });
  })

  test("create order product for consultation invalid access", (done) => {
    request(app)
        .post("/products/chat")
        .set('access_token', 'fffj66g')
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toEqual({
            message: "Invalid token",
          });
          done();
        })
        .catch((err) => {
          console.log(err, "ini err");
          done(err);
        });
  })


})

describe ("client cart", () => {

  //TODO 1 show client card
  test("show client card", (done) => {
    request(app)
    .get("/account/cart")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 show client card no access_token
    test("show client card no access_token", (done) => {
      request(app)
      .get("/account/cart")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({message: "Please Login first"});
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    //TODO 3 show client card invalid token
  test("show client card invalid access_token", (done) => {
    request(app)
    .get("/account/cart")
    .set('access_token', 'fffj66g')
    .then((res) => {
      console.log(res,">>>>>>>>ini res");
      expect(res.status).toBe(401);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toEqual({
        message: "Invalid token",
      });
      done();
    })
    .catch((err) => {
      console.log(err, "ini err");
      done(err);
    });
  })
})


describe ("client detail checkout", () => {

  //TODO 1 client detail chekout success
  test("client detail checkout success", (done) => {
    request(app)
    .get("/account/detail-checkout")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 client detail checkout no Access-token 
    test("client detail checkout no Access-token ", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({message: "Please Login first"});
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    //TODO 3 client detail checkout invalid Access-token 
    test("client detail checkout invalid token", (done) => {
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

describe ("post client detail checkout", () => {

  //TODO 1 post client detail chekout success
  test("post client detail checkout success", (done) => {
    request(app)
    .post("/account/payment")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 post client detail checkout invalid token 
    test("post client detail checkout invalid token ", (done) => {
      request(app)
      .post("/account/payment")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({message: "Please Login first"});
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    //TODO 3 client detail checkout invalid Access-token 
    test(" post create order product for consultation not authorize", (done) => {
      request(app)
      .post("/account/payment")
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



//TODO 1 show client card empty
test("show client card", (done) => {
  request(app)
  .get("/account/cart")
  .set('access_token', tokenMatch1)
  .then((res) => {
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
    done();
  })
  .catch((err) => {
    done(err);
  });
})

  //TODO 1 client detail chekout success
  test("client detail checkout success", (done) => {
    request(app)
    .get("/account/detail-checkout")
    .set('access_token', tokenMatch1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 1 client detail chekout success
    test("client detail checkout success", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .set('access_token', tokenMatch1)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

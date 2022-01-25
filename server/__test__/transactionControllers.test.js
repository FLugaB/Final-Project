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
    "UserId" : 1,
    "Ordder_Id": "7ufie4",
    "status": "accept"
  },
  {
    "UserId" : 2,
    "Ordder_Id": "SANDBOX-G656665790-381",
    "status": "cancel"
  },
  {
    "UserId" : 3,
    "Ordder_Id": "1m4734",
    "status": "expired"
  },
  {
    "UserId" : 4,
    "Ordder_Id": "FF-02",
    "status": "credit"
  },
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
          expect(res.status).toBe(201);
          expect(res.body).toEqual(expect.any(Object));
          done();
        })
        .catch((err) => {
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



describe ("notification transaction", () => {

  //TODO 1 notification transaction success
  test("notification transaction success", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', tokenMatch1)
    .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "7ufie4",
        merchant_id: "G656665790",
        masked_card: "481111-1114",
        gross_amount: "240000.00",
        fraud_status: "accept",
        currency: "IDR",
        channel_response_message: "Approved",
        channel_response_code: "00",
        card_type: "credit",
        bank: "cimb",
        approval_code: "1642769112700"
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

    //TODO 2 notification transaction invalid token 
    test("notification transaction invalid token ", (done) => {
      request(app)
      .post("/notification/handling")
      .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "7ufie4",
        merchant_id: "G656665790",
        masked_card: "481111-1114",
        gross_amount: "240000.00",
        fraud_status: "accept",
        currency: "IDR",
        channel_response_message: "Approved",
        channel_response_code: "00",
        card_type: "credit",
        bank: "cimb",
        approval_code: "1642769112700"
    })
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({message: "Invalid access"});
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    //TODO 3 notification transaction invalid Access-token 
    test(" notification transaction not authorize", (done) => {
      request(app)
      .post("/notification/handling")
      .set('access_token', 'cdds6f')
      .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "7ufie4",
        merchant_id: "G656665790",
        masked_card: "481111-1114",
        gross_amount: "240000.00",
        fraud_status: "accept",
        currency: "IDR",
        channel_response_message: "Approved",
        channel_response_code: "00",
        card_type: "credit",
        bank: "cimb",
        approval_code: "1642769112700"
    })
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ message: "Invalid token" });
        done();
      })
      .catch((err) => {
        done(err);
      });
    })
  
  //TODO 4 notification transaction not success
  test("notification transaction not success cancel", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', tokenMatch1)
    .send({
      transaction_time: "2022-01-21 19:45:12",
      transaction_status: "capture",
      transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
      status_message: "midtrans payment notification",
      status_code: "200",
      signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
      payment_type: "credit_card",
      order_id: "SANDBOX-G656665790-381",
      merchant_id: "G656665790",
      masked_card: "481111-1114",
      gross_amount: "240000.00",
      fraud_status: "cancel",
      currency: "IDR",
      channel_response_message: "Approved",
      channel_response_code: "00",
      card_type: "credit",
      bank: "cimb",
      approval_code: "1642769112700"
  })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    })
  })

    //TODO 5 notification transaction not success
    test("notification transaction not success", (done) => {
      request(app)
      .post("/notification/handling")
      .set('access_token', tokenMatch1)
      .send({
          transaction_time: "2022-01-21 19:45:12",
          transaction_status: "capture",
          transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
          status_message: "midtrans payment notification",
          status_code: "200",
          signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
          payment_type: "credit_card",
          order_id: "1m4734",
          merchant_id: "G656665790",
          masked_card: "481111-1114",
          gross_amount: "240000.00",
          fraud_status: "expired",
          currency: "IDR",
          channel_response_message: "Approved",
          channel_response_code: "00",
          card_type: "credit",
          bank: "cimb",
          approval_code: "1642769112700"
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

  //TODO 5 notification transaction not success
  test("notification transaction not success", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', tokenMatch1)
    .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "1m4734",
        merchant_id: "G656665790",
        masked_card: "481111-1114",
        gross_amount: "240000.00",
        fraud_status: "deny",
        currency: "IDR",
        channel_response_message: "Approved",
        channel_response_code: "00",
        card_type: "credit",
        bank: "cimb",
        approval_code: "1642769112700"
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

  //TODO 5 notification transaction not success
  test("notification transaction not success", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', tokenMatch1)
    .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "FF-02",
        merchant_id: "G656665790",
        masked_card: "481111-1114",
        gross_amount: "240000.00",
        fraud_status: "settlement",
        currency: "IDR",
        channel_response_message: "Approved",
        channel_response_code: "00",
        card_type: "credit",
        bank: "cimb",
        approval_code: "1642769112700"
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })


    //TODO 5 notification transaction not success
    test("notification transaction not success", (done) => {
      request(app)
      .post("/notification/handling")
      .set('access_token', tokenMatch1)
      .send({
          transaction_time: "2022-01-21 19:45:12",
          transaction_status: "capture",
          transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
          status_message: "midtrans payment notification",
          status_code: "200",
          signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
          payment_type: "credit_card",
          order_id: "11snzvr",
          merchant_id: "G656665790",
          masked_card: "481111-1114",
          gross_amount: "240000.00",
          fraud_status: "settlement",
          currency: "IDR",
          channel_response_message: "capture",
          channel_response_code: "00",
          card_type: "credit",
          bank: "cimb",
          approval_code: "1642769112700"
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual(expect.any({ name: "PLEASE_PAY_FIRST" }));
        done();
      })
      .catch((err) => {
        done(err);
      });
    })
})



// //TODO 1 show client card empty
// test("show client card", (done) => {
//   request(app)
//   .get("/account/cart")
//   .set('access_token', tokenMatch1)
//   .then((res) => {
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.any(Object));
//     done();
//   })
//   .catch((err) => {
//     done(err);
//   });
// })

//   //TODO 1 client detail chekout success
//   test("client detail checkout success", (done) => {
//     request(app)
//     .get("/account/detail-checkout")
//     .set('access_token', tokenMatch1)
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual(expect.any(Object));
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
//   })

//     //TODO 1 client detail chekout success
//     test("client detail checkout success", (done) => {
//       request(app)
//       .get("/account/detail-checkout")
//       .set('access_token', tokenMatch1)
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toEqual(expect.any(Object));
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//     })

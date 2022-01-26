const app = require("../app");
const request = require("supertest");
const { Product,User, DetailProduct, OrderProduct, Transaction, Voucher } = require("../models");
const { getToken } = require("../helpers/jwt");

let clientToken, tokenPayloadInvalid

const product  = 
{
  "title": "Chat consultation", 
  "type": "Ticket Chat"
}
const detail = 
{
  "ProductId": 1,
  "name": "Ticket Chat 2",
  "price": 200000,
  "category": "Ticket",
  "stock": 1,
  "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
  "description": "Ticket Counsultation via Chat"
}  
const order = [
  {
    "UserId" : 1,
    "order_id": "7ufie4",
    "status": "accept",
    "ammount": 240000
  },
  {
    "UserId" : 2,
    "order_id": "SANDBOX-G656665790-381",
    "status": "cancel",
    "ammount": 240000
  },
  {
    "UserId" : 3,
    "order_id": "1m4734",
    "status": "expired",
    "ammount": 240000
  },
  {
    "UserId" : 4,
    "order_id": "1m4734",
    "status": "deny",
    "ammount": 240000
  },
  {
    "UserId" : 5,
    "order_id": "FF-02",
    "status": "settlement",
    "ammount": 240000
  }
]

beforeAll(async () => {

  try {
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
    // await OrderProduct.destroy({
    //   where: {},
    //   truncate: true,
    //   restartIdentity: true,
    //   cascade: true,
    // });
    await Transaction.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    let newClient = {
      email: "newClient@gmail.com",
      password: "newClient",
      role: "Client",
    }; 

    const createdClient = await User.create(newClient);
    let payload = {
      id: createdClient.id,
      email: createdClient.email,
    };
    clientToken = getToken(payload);

    let newDoctor1 = {
      email: "newDoctor1@gmail.com",
      password: "newDoctor1",
      role: "Doctor",
    }; 

    const createdDoctor = await User.create(newDoctor1);
    let payload2 = {
      id: createdDoctor.id,
      email: createdDoctor.email,
    };
    doctorToken = getToken(payload2);

    let wrongPayload = {
      id: 1000,
      email: "wrongEmail@gmail.com",
    };
    tokenPayloadInvalid = getToken(wrongPayload);

    await Product.create(product);
    await DetailProduct.create(detail);
    return Transaction.bulkCreate(order)
  } catch (err) {
    console.log(err, "ERROR BEFORE");
  }
}, 8000)

describe("ticket consultation", () => {

  test("create order product for consultation success", (done) => {
    request(app)
        .post("/products/chat")
        .set('access_token', clientToken)
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toEqual(expect.any(Object));
          done();
        })
        .catch((err) => {
          done(err);
        });
  })

  test("create order product for consultation no access token", (done) => {
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
    .set('access_token', clientToken)
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

describe ("client detail checkout", () => {

  //TODO 1 client detail chekout success
  test("client detail checkout success", (done) => {
    request(app)
    .get("/account/detail-checkout")
    .set('access_token', clientToken)
    .then((res) => {
      expect(res.status).toBe(201);
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

  const voucher = {
    "UserId" : 1,
    "ProductId": "FF-02",
    "status": "pending",
  }
  Voucher.create(voucher);

    //TODO 1 client detail chekout success
    test("client detail checkout success", (done) => {
      request(app)
      .get("/account/detail-checkout")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
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
    .set('access_token', clientToken)
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

  //TODO 1 notification transaction success capture
  test("notification transaction success capture", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
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
      expect(res.body[1][0]).toHaveProperty("status","paid");
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

  //TODO 2 notification transaction not found order id
  test("notification transaction not found order id", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
    .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "7ufie4_SALAH",
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
      expect(res.body).toHaveProperty("message", "Invalid access");
      done();
    })
    .catch((err) => {
      done(err);
    });
  })
  
  // TODO 3 notification transaction not success 404
  test("notification transaction not success cancel", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
    .send({
      transaction_time: "2022-01-21 19:45:12",
      transaction_status: "expired",
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
      expect(res.body[1][0]).toHaveProperty("status","failed");
      done();
    })
    .catch((err) => {
      done(err);
    })
  })

  // TODO 3 notification transaction not success 404
  test("notification transaction not success cancel", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
    .send({
      transaction_time: "2022-01-21 19:45:12",
      transaction_status: "cancel",
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
      expect(res.body[1][0]).toHaveProperty("status","failed");
      done();
    })
    .catch((err) => {
      done(err);
    })
  })

  //TODO 4 notification transaction not success pay first
  test("notification transaction not success", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
    .send({
        transaction_time: "2022-01-21 19:45:12",
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
      expect(res.status).toBe(400);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message","If you just pay, please wait for a momment, else pay the ticket first before u could use it");
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
    .set('access_token', clientToken)
    .send({
        transaction_time: "2022-01-21 19:45:12",
        transaction_status: "capture",
        transaction_id: "9debe4e5-285b-4525-9bcd-d85fe123496a",
        status_message: "midtrans payment notification",
        status_code: "200",
        signature_key: "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
        payment_type: "credit_card",
        order_id: "1m47d34",
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
      expect(res.status).toBe(403);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })

  //TODO 6 notification transaction not success
  test("notification transaction not success", (done) => {
    request(app)
    .post("/notification/handling")
    .set('access_token', clientToken)
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
      expect(res.status).toBe(403);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })
  
})

describe ("test transaction success ticket", () => {
  //TODO 1 show client card
  test("show client card", (done) => {
    request(app)
    .get("/account/tickets")
    .set('access_token', clientToken)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  })
})

describe ("detail checkout", () => {

  //TODO 1 show detail checkout no access_token
  test("show detail checkout no access_token", (done) => {
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

  //TODO 2 show detail checkout invalid token
  test("show detail checkout invalid access_token", (done) => {
    request(app)
    .get("/account/detail-checkout")
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

  // TODO 4 detail checkout not found order product
  test("detail checkout not found order product", (done) => {

      request(app)
      .patch("/account/detail-checkout")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  }) 

})

describe ("client ticket", () => {

  //TODO 1 show client ticket no access_token
  test("show client ticket no access_token", (done) => {
    request(app)
    .patch("/account/tickets/1")
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

  //TODO 2 show client ticket invalid token
  test("show client ticket invalid access_token", (done) => {
    request(app)
    .patch("/account/tickets/9")
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

  // TODO 4 not found doctor id
  test("not found doctor id", (done) => {

      request(app)
      .patch("/account/tickets/")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  }) 

  // TODO 1 not found doctor
  test("not found doctor", (done) => {
    request(app)
    .patch("/account/tickets/99")
    .set('access_token', clientToken)
    .then((res) => {
      expect(res.status).toBe(404);
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("message", "There is no Doctor");
      done();
    })
    .catch((err) => {
      done(err);
    });
  }) 

  

  // TODO 1 found doctor success add voucher
  test("found doctor success add voucher", (done) => {
    request(app)
    .patch("/account/tickets/2")
    .set('access_token', clientToken)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
  }) 

  // TODO 1 not found voucher
  test("not found voucher", (done) => {
    request(app)
    .patch("/account/tickets/2")
    .set('access_token', clientToken)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.any(Object));
      // expect(res.body).toHaveProperty("message", "There is no Voucher Ticket");
      done();
    })
    .catch((err) => {
      done(err);
    });
  }) 

})

describe("fetch status transaction", () => {
  //TODO 1 fetch status transaction no access_token
  test("fetch status transaction no access_token", (done) => {
    request(app)
      .get("/account/status-transactions")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 fetch status transaction not authorized
  test("fetch status transaction not authorized", (done) => {
    request(app)
      .get("/account/status-transactions")
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
  
  //TODO 3 fetch status transaction success
  test("fetch status transaction success", (done) => {
    request(app)  
      .get("/account/status-transactions")
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

describe ("test transaction not found", () => {
    //TODO 1 not found product
    test("not found product", async () => {
      try {
        await DetailProduct.destroy({
          where: {},
          truncate: true,
          restartIdentity: true,
          cascade: true,
        });
        const res = await request(app)
        .post("/products/chat")
        .set("access_token", clientToken)
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "Product not found");
      } catch (error) {
        console.log(error);
      }
    });
    // TODO 2 not found client ticket
    test("not found client card", (done) => {

      request(app)
      .get("/account/cart")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "there is no orders yet, please order again");
        done();
      })
      .catch((err) => {
        done(err);
      });
    }) 
    
    // TODO 3 not found client ticket get
    test("not found client ticket get", (done) => {
     Voucher.destroy({
        where: {},
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
      request(app)
      .get("/account/tickets")
      .set('access_token', clientToken)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "there is no orders yet, please order again");
        done();
      })
      .catch((err) => {
        done(err);
      });
    }) 
    
})

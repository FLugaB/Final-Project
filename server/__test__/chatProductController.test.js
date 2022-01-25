const app = require("../");
const request = require("supertest");
const { User, OrderProduct, Voucher, Product, DetailProduct } = require("../models");
const { getToken } = require("../helpers/jwt");

let tokenMatch1,  doctorToken, client2;
let invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJjaW5keVZAZ21haWwuY29tIiwiaWF0IjoxNjQyNjAzMzQ1fQ.bx0MAXaSmsYCa3Qbac8KQpCftEzKtFgpr8I96I1xZed";


let dataVoucher =[ {
  voucherToken: "",
  status: "used",
  DoctorId: 1,
  ClientId: 1,
  transactionId: 1
  },
  {
    voucherToken: "",
    status: "completed",
    DoctorId: 1,
    ClientId: 1,
    transactionId: 1
  },
  {
    voucherToken: "",
    status: "used",
    DoctorId: 1,
    ClientId: 2,
    transactionId: 1
  }
]

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Voucher.destroy({
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

  const newDoctor  = {
    email: "doctor@gmail.com",
    password: "doctor",
    role: "Doctor"
  }

  const newClient = {
    email: "newClient12@gmail.com",
    password: "newClient",
    role: "Client",
  };

  Voucher.bulkCreate(dataVoucher)

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
      
      const createdClient1 = await User.create(newClient);
      let payload= {
        id: createdClient1.id,
        email: createdClient1.email,
      };
      client2 = getToken(payload)
  } catch (err) {
    console.log(err);
  }
})

describe("voucher used", () => {
  //TODO 1 voucher used no access_token
  test("voucher used no access_token", (done) => {
    request(app)
      .get("/account/voucherUsed")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 voucher used wrong authorized
  test("voucher used wrong access_token", (done) => {
    request(app)
      .get("/account/voucherUsed")
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
  
  //TODO 3 voucher used uccess
  test("voucher used success", (done) => {
    request(app)  
      .get("/account/voucherUsed")
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

    
  //TODO 3 voucher used uccess
  test("doesn't have vocher", (done) => {
    request(app)  
      .get("/account/voucherUsed")
      .set("access_token", doctorToken)
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

describe("voucher completed", () => {
  //TODO 1 voucher used no access_token
  test("voucher used no access_token", (done) => {
    request(app)
      .get("/account/voucherCompleted")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 voucher completed wrong authorized
  test("voucher completed wrong access_token", (done) => {
    request(app)
      .get("/account/voucherCompleted")
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
  
  //TODO 3 voucher completed  success
  test("voucher completed ", (done) => {
    request(app)  
      .get("/account/voucherCompleted")
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

    //TODO 3 voucher completed  success
  test("voucher completed ", (done) => {
    request(app)  
      .get("/account/voucherCompleted")
      .set("access_token", doctorToken)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object))
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

    //TODO 4 voucher no completed  success
    test("voucher no completed ", (done) => {
      request(app)  
        .get("/account/voucherCompleted")
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


describe("voucher usedByToken", () => {
  //TODO 1 voucher usedByToken no access_token
  test("voucher usedByToken no access_token", (done) => {
    request(app)
      .patch("/account/voucherUsed/ferw43")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', "Please Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 voucher completed wrong authorized
  test("voucher completed wrong access_token", (done) => {
    request(app)
      .patch("/account/voucherUsed/ge443e")
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
  
  //TODO 3 voucher completed  success
  test("voucher completed ", (done) => {
    request(app)  
      .patch("/account/voucherUsed/1")
      .set("access_token", tokenMatch1)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object))
        done();
      })
      .catch((err) => {
        console.log(err,">>>>>>>>>ini err");
        done(err);
      });
  });

    //TODO 4 voucher no completed  success
    test("voucher no completed ", (done) => {
      request(app)  
        .patch("/account/voucherUsed/5")
        .set("access_token", doctorToken)
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
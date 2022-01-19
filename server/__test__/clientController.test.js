const app = require("../");
const request = require("supertest");
const { User, Profile } = require("../models");
const { getToken } = require("../helpers/jwt");

const defaultImage =
  "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332";

console.log("test user testing");

let tokenMatch1;
let invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJjaW5keVZAZ21haWwuY29tIiwiaWF0IjoxNjQyNjAzMzQ1fQ.bx0MAXaSmsYCa3Qbac8KQpCftEzKtFgpr8I96I1xZed";

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Profile.destroy({
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

  try {
    const createdUser = await User.create(newClientTest);
    let payload1 = {
      id: createdUser.id,
      email: createdUser.email,
    };

    tokenMatch1 = getToken(payload1);

    let newProfile = {
      fullName: "newClient",
      birthdate: "1998-03-29 13:34:00.000 +0700",
      gender: "Male",
      address: "Bekasi",
      photoProfile: defaultImage,
      phoneNumber: "082258852654",
      UserId: createdUser.id,
    };

    await Profile.create(newProfile);
  } catch (err) {
    console.log(err);
  }
});

describe("New Client Test on clientRegister Field", () => {
  //TODO 1 Register Success
  test("Register success should be return valid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient2@gmail.com",
        password: "newClient2",
        role: "Client",
        fullName: "newClient2",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("id", 2);
        expect(res.body).toHaveProperty("email", "newClient2@gmail.com");
        expect(res.body).toHaveProperty("fullName", "newClient2");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 Register email is null
  test("Register email is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        password: "newClient2",
        role: "Client",
        fullName: "newClient2",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Email is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 3 Register email is empty
  test("Register email is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "",
        password: "newClient2",
        role: "Client",
        fullName: "newClient2",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Email is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 4 Register email invalid format
  test("Register email invalid format should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient1@gmail.com",
        password: "newClient1",
        role: "Client",
        fullName: "newClient1",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Email must be unique");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 5 Register password is null
  test("Register password is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient2@gmail.com",
        role: "Client",
        fullName: "newClient2",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Password is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 6 Register password is empty
  test("Register password is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient2@gmail.com",
        password: "",
        role: "Client",
        fullName: "newClient2",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        console.log(res.body, `reqStatus`);
        console.log(res.status, `reqStatus`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Password is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 7 Register fullName is null
  test("Register fullName is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Fullname is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 8 Register fullName is empty
  test("Register fullName is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Fullname is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 9 Register birthdate is null
  test("Register birthdate is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        // birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Birthdate is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 10 Register birthdate is empty
  test("Register birthdate is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid date format");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 11 Register gender is null
  test("Register gender is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Gender is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 12 Register gender is empty
  test("Register gender is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Gender is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 13 Register address is null
  test("Register address is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Address is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 14 Register address is empty
  test("Register address is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Address is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 15 Register phoneNumber is null
  test("Register phoneNumber is null should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        // phoneNumber: "082258852654",
        UserId: 1,
      })
      .then((res) => {
        console.log(res.status, `resstatus`);
        console.log(res.body, `checker`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Phone Number is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 16 Register phoneNumber is empty
  test("Register phoneNumber is empty should be return invalid response", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "newClient3@gmail.com",
        password: "newClient3",
        role: "Client",
        fullName: "newClient3",
        birthdate: "1998-03-29 13:34:00.000 +0700",
        gender: "Male",
        address: "Bekasi",
        photoProfile:
          "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
        phoneNumber: "",
        UserId: 1,
      })
      .then((res) => {
        console.log(res.status, `resstatus`);
        console.log(res.body, `checker`);
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Phone Number is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("New Client Test on clientLogin Field", () => {
  //TODO 1 Login Success
  test("Login success should be return valid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1@gmail.com",
        password: "newClient",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ access_token: res.body.access_token });
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // TODO 2 Login email is null
  test("Login email is null should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Email/Password is required",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 3 Login email is empty
  test("Login email is empty should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "",
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Email/Password is required",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 4 Login password is null
  test("Login password is null should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1@gmail.com",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Email/Password is required",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 5 Login password is empty
  test("Login password is empty should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1@gmail.com",
        password: "",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Email/Password is required",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 6 Login findUser not found
  test("Login findUser not found should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1000@gmail.com",
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Invalid email/password",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 7 Login verify is undefined
  test("Login verify is undefined should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1000@gmail.com",
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          message: "Invalid email/password",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("New Client Test on clientAccount Authentication Field", () => {
  //TODO 1 Client Account Authentication Found
  test("Client Account Authentication Found should be return valid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", tokenMatch1)
      .send({
        email: "newClient1@gmail.com",
        password: "newClient",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("findUser.id", 1);
        expect(res.body).toHaveProperty(
          "findUser.email",
          "newClient1@gmail.com"
        );
        expect(res.body).toHaveProperty("findUser.role", "Client");
        expect(res.body).toHaveProperty(
          "findUser.Profile.fullName",
          "newClient"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  //TODO 2 Client Account Authentication Invalid Access Token
  test("Client Account Authentication Invalid Access Token should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", invalidToken)
      .send({
        email: "newClient1@gmail.com",
        password: "newClient",
        role: "Client",
      })
      .then((res) => {
        console.log(res.body, `resbodyyyyy`);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  //TODO 3 Client Account Authentication payload undefined
  test("Client Account Authentication payload undefined should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", invalidToken)
      .send({
        email: "newClient1@gmail.com",
        password: "newClient",
        role: "Client",
      })
      .then((res) => {
        console.log(res.body, `resbodyyyyy`);
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

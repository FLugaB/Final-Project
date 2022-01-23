const app = require("../");
const request = require("supertest");
const { User, Profile } = require("../models");
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
  await Profile.destroy({
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


  //! USER1
  let newClientTest = {
    email: "newClient1@gmail.com",
    password: "newClient",
    role: "Client",
  };

  
  let newAdmin = {
    email: "newAdmin@gmail.com",
    password: "newAdmin",
    role: "Admin",
  };

  try {
    const createdUser = await User.create(newClientTest);
    let payload1 = {
      id: createdUser.id,
      email: createdUser.email,
    };

    tokenMatch1 = getToken(payload1);
      const createdDoctor = await User.create(newDoctor);
      let payload3 = {
        id: createdDoctor.id,
        email: createdDoctor.email,
      };
  
      doctorToken = getToken(payload3);
      console.log(doctorToken, ">>>>>>>>ini llaaa");


    const createdAdmin = await User.create(newAdmin);
    let payload2 = {
      id: createdAdmin.id,
      email: createdAdmin.email,
    };

    adminToken = getToken(payload2);

    let wrongPayload = {
      id: 1000,
      email: "wrongEmail@gmail.com",
    };

    tokenPayloadInvalid = getToken(wrongPayload);

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

  //! USER 2
  let newClientTest2 = {
    email: "newClient1@gmail.com",
    password: "newClient",
    role: "Client",
  };

  try {
    const createdUser2 = await User.create(newClientTest2);
    let payload2 = {
      id: createdUser2.id,
      email: createdUser2.email,
    };

    tokenMatch2 = getToken(payload2);

    let newProfile2 = {
      fullName: "newClient2",
      birthdate: "1998-03-29 13:34:00.000 +0700",
      gender: "Male",
      address: "Planet Bekasi",
      photoProfile: defaultImage,
      phoneNumber: "082254452654",
      UserId: createdUser2.id,
    };

    await Profile.create(newProfile2);
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
        email: "newClientSuccess@gmail.com",
        password: "newClientSuccess",
        role: "Client",
        fullName: "newClientSuccess",
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
        expect(res.body).toHaveProperty("id", 5);
        expect(res.body).toHaveProperty("email", "newClientSuccess@gmail.com");
        expect(res.body).toHaveProperty("fullName", "newClientSuccess");
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
        email: "newClient1gmail.com",
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
        expect(res.body).toHaveProperty("message", "Invalid email format");
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


describe("New Doctor Test on  login Field", () => {
  //TODO 1 Login Success
  test("Login success should be return valid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "doctor@gmail.com",
        password: "doctor",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({ access_token: res.body.access_token });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 2 Login email is null
  test("Login email is null should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        password: "doctor",
        role: "Doctor"
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
        password: "doctor",
        role: "Doctor"
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
        email: "doctor@gmail.com",
        role: "Doctor"
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
        email: "doctor@gmail.com",
        password: "",
        role: "Doctor"
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

  // TODO 6 Login find Admin not found
  test("Login find Admin not found should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "doctor11@gmail.com",
        password: "doctor",
        role: "Doctor"
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
        email: "doctor@gmail.com",
        password: "doctor222",
        role: "Doctor"
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
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("findUser.id", 1);
        done();
      })
      .catch((err) => {
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
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 3 Client Account Authentication Access Token undefined
  test("Client Account Authentication Access Token undefined should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .send({
        email: "newClient1@gmail.com",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Pleae Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 4 Client Account Authentication payload undefined
  test("Client Account Authentication payload undefined should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", invalidToken)
      .send({
        email: "newClient1@gmail.com",
        role: "Client",
      })
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 5 Client Account Authentication payload less than 1
  test("Client Account Authentication payload less than 1 should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", "")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Pleae Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 6 Client Account Authentication user not found
  test("Client Account Authentication user not found should be return invalid response", (done) => {
    request(app)
      .get("/account")
      .set("access_token", "gt55f")
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Client Update Profile", () => {

  //TODO 1 client update profile user not found no access token
  test("client update profile user not found no access token", (done) => {
    request(app)
      .put("/account")
      .set("access_token", "")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Pleae Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

  //TODO 2 client update profile user not found invalid access token
  test("client update profile user not found invalid access token", (done) => {
    request(app)
      .put("/account")
      .set("access_token", invalidToken)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

    //TODO 3 client success update
    test("update success should be return valid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
        .send({
          email: "editClientSuccess@gmail.com",
          password: "editClientSuccess",
          fullName: "editClientSuccess",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toEqual({successText: "Success update profile"});
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 4 Update email is empty
    test("Update email is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
        .send({
          email: "",
          password: "newClient2",
          fullName: "newClient2",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
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
  
    //TODO 5 update email invalid format
    test("update email invalid format should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
        .send({
          email: "newClient1gmail.com",
          password: "newClient1",
          fullName: "newClient1",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Invalid email format");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 6 update password is empty
    test("update password is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
        .send({
          email: "newClient2@gmail.com",
          password: "",
          fullName: "newClient2",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
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
  
    //TODO 7 Update fullName is empty
    test("Update fullName is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
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
  
    //TODO 9 update birthdate is empty
    test("update birthdate is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
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

    //TODO 10 Update gender is empty
    test("Update gender is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
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

    //TODO 11 update address is empty
    test("update address is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
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
  
    //TODO 12 update phoneNumber is empty
    test("update phoneNumber is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", tokenMatch1)
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
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Phone Number is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
})

describe("Doctor Update Profile", () => {

  //TODO 1 doctor update profile user not found no access token
  test("doctor update profile user not found no access token", (done) => {
    request(app)
      .put("/account")
      .set("access_token", "")
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Pleae Login first")
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

  //TODO 2 doctor update profile user not found invalid access token
  test("doctor update profile user not found invalid access token", (done) => {
    request(app)
      .put("/account")
      .set("access_token", invalidToken)
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty("message", "Invalid token")
        done();
      })
      .catch((err) => {
        done(err);
      });
  })

    //TODO 3 doctor success update
    test("update success should be return valid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "editDoctorSuccess@gmail.com",
          password: "editDoctorSuccess",
          fullName: "editDoctorSuccess",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toEqual({successText: "Success update profile"});
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 4 Update email is empty
    test("Update email is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "",
          password: "newDoctor2",
          fullName: "newDoctor2",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
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
  
    //TODO 5 update email invalid format
    test("update email invalid format should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor1gmail.com",
          password: "newDoctor1",
          fullName: "newDoctor1",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Invalid email format");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 6 update password is empty
    test("update password is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor2@gmail.com",
          password: "",
          fullName: "newDoctor2",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
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
  
    //TODO 7 Update fullName is empty
    test("Update fullName is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor3@gmail.com",
          password: "newDoctor3",
          role: "Doctor",
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
  
    //TODO 9 update birthdate is empty
    test("update birthdate is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor3@gmail.com",
          password: "newDoctor3",
          role: "Doctor",
          fullName: "newDoctor3",
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

    //TODO 10 Update gender is empty
    test("Update gender is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor3@gmail.com",
          password: "newDoctor3",
          role: "Doctor",
          fullName: "newDoctor3",
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

    //TODO 11 update address is empty
    test("update address is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor3@gmail.com",
          password: "newDoctor3",
          role: "Doctor",
          fullName: "newDoctor3",
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
  
    //TODO 12 update phoneNumber is empty
    test("update phoneNumber is empty should be return invalid response", (done) => {
      request(app)
        .put("/account")
        .set("access_token", doctorToken)
        .send({
          email: "newDoctor3@gmail.com",
          password: "newDoctor3",
          role: "Doctor",
          fullName: "newDoctor3",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "",
          UserId: 1,
        })   
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Phone Number is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
})

describe("Fetch doctor list", () => {
  //TODO 2 fetch doctor list success
  test("fetch doctor list success", (done) => {
    request(app)
    .get("/doctors")
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.any(Object))
      done();
    })
    .catch((err) => {
      done(err);
    });  
  });
  
  
  //TODO 2 fetch doctor list by id success
  test("fetch doctor list by id success", (done) => {
    request(app)
    .get("/doctor/1")
    .then((res) => {
      expect(res.status).toBe(200)
      expect(res.body).toEqual(expect.any(Object))
      done();
    })
    .catch((err) => {
      done(err);
    });  
  });
  
  //TODO 1 fetch doctor list wrong id by id
  test("fetch doctor list wrong id by id", (done) => {
    request(app)
    .get("/doctor/9")
    .then((res) => {
      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty("message", "Not Found");
      expect(res.body).toEqual(expect.any(Object))
      done();
    })
    .catch((err) => {
      done(err);
    });  
  });

    //TODO 1 fetch doctor list wrong id by id
    test("fetch doctor list no id by id", (done) => {
      request(app)
      .get("/doctor/")
      .then((res) => {
        expect(res.status).toBe(404)
        done();
      })
      .catch((err) => {
        done(err);
      });  
    });
  

  //TODO 1 fetch doctor list empty
  test("fetch doctor list empty", (done) => {
    const data = async () => {
      await User.destroy({
        where: {role : "Doctor"},
        truncate: true,
        restartIdentity: true,
        cascade: true,     
      });  
    }
    request(app)
    .get(`/doctors`)
    .then((res) => {
      expect(res.status).toBe(404)
      done();
    })
    .catch((err) => {
      done(err);
    });  
  });
})
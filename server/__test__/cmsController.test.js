const app = require("../");
const request = require("supertest");
const { User } = require("../models");
const { getToken } = require("../helpers/jwt");

let invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJjaW5keVZAZ21haWwuY29tIiwiaWF0IjoxNjQyNjAzMzQ1fQ.bx0MAXaSmsYCa3Qbac8KQpCftEzKtFgpr8I96I1xZed";
  
let tokenMatch1

beforeAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

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
    console.log(err);
  }
})

  describe("New admin Test on Register Field", () => {
    //TODO 1 Register Success
    test("Register success should be return valid response", (done) => {
      request(app)
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({  
          email: "newAdminSuccess@gmail.com",
          password: "newAdminSuccess",
          fullName: "newAdminSuccess",
          birthdate: "1998-03-29 13:34:00.000 +0700",
          gender: "Male",
          address: "Bekasi",
          photoProfile:
            "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
          phoneNumber: "082258852654",
        })
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("id", 2);
          expect(res.body).toHaveProperty("email", "newAdminSuccess@gmail.com");
          expect(res.body).toHaveProperty("fullName", "newAdminSuccess");
          done();
        })
        .catch((err) => {
          console.log(err,">>>>>>>>ini err");
          done(err);
        });
    });
  
    //TODO 2 Register email is null
    test("Register email is null should be return invalid response", (done) => {
      request(app)
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          password: "newAdmin2",
          role: "Admin",
          fullName: "newAdmin2",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "",
          password: "newAdmin2",
          role: "Admin",
          fullName: "newAdmin2",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin1gmail.com",
          password: "newAdmin1",
          role: "Admin",
          fullName: "newAdmin1",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin2@gmail.com",
          role: "Admin",
          fullName: "newAdmin2",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin2@gmail.com",
          password: "",
          role: "Admin",
          fullName: "newAdmin2",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
        .post("/cms/register")
        .set('access_token', tokenMatch1)
        .send({
          email: "newAdmin3@gmail.com",
          password: "newAdmin3",
          role: "Admin",
          fullName: "newAdmin3",
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
  
  describe("New Admin Test on AdminLogin Field", () => {
    //TODO 1 Login Success
    test("Login success should be return valid response", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "newAdmin@gmail.com",
          password: "newAdmin",
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
          role: "Admin",
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
          role: "Admin",
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
          email: "newAdmin1@gmail.com",
          role: "Admin",
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
          email: "newAdmin1@gmail.com",
          password: "",
          role: "Admin",
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
          email: "newAdmin1000@gmail.com",
          password: "passwordInvalid",
          role: "Admin",
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
          email: "newAdmin1000@gmail.com",
          password: "passwordInvalid",
          role: "Admin",
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

    // TODO 8 Login verify is undefined
    test("Login verify is undefined should be return invalid response", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "newAdmin1000@gmail.com",
          password: "passwordInvalid",
          role: "Admin",
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


  describe("New Admin Test on adminAccount Authentication Field", () => {
    //TODO 1 admin Account Authentication Found
    test("admin Account Authentication Found should be return valid response", (done) => {
      request(app)
        .get("/account")
        .set("access_token", tokenMatch1)
        .send({
          email: "newAdmin@gmail.com",
          password: "newAdmin",
          role: "Admin",
        })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("findUser.id", 1);
          expect(res.body).toHaveProperty("findUser.role", "Admin");
  
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 2 Admin Account Authentication Invalid Access Token
    test("Admin Account Authentication Invalid Access Token should be return invalid response", (done) => {
      request(app)
        .get("/account")
        .set("access_token", 'sdfd55ff')
        .send({
          email: "newAdmin@gmail.com",
          password: "newAdmin",
          role: "Admin",
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
  
    //TODO 3 Admin Account Authentication Access Token undefined
    test("Admin Account Authentication Access Token undefined should be return invalid response", (done) => {
      request(app)
        .get("/account")
        .send({
          email: "newAdmin@gmail.com",
          password: "newAdmin",
          role: "Admin",
        })
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 4 Admin Account Authentication payload undefined
    test("Admin Account Authentication payload undefined should be return invalid response", (done) => {
      request(app)
        .get("/account")
        .set("access_token", invalidToken)
        .send({
          email: "newAdmin@gmail.com",
          password: "newAdmin",
          role: "Admin",
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
  
    //TODO 5 Admin Account Authentication payload less than 1
    test("Admin Account Authentication payload less than 1 should be return invalid response", (done) => {
      request(app)
        .get("/account")
        .set("access_token", "")
        .then((res) => {
          expect(res.status).toBe(403);
          expect(res.body).toEqual(expect.any(Object));
          expect(res.body).toHaveProperty("message", "Please Login first")
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  
    //TODO 6 Admin Account Authentication user not found
    test("Admin Account Authentication user not found should be return invalid response", (done) => {
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

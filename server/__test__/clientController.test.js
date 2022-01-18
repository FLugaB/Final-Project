const app = require("../");
const request = require("supertest");
const { User, Profile } = require("../models");
const defaultImage =
  "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332";

console.log("test user testing");

beforeAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Profile.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  let newClientTest = {
    email: "newClient1@gmail.com",
    password: "newClient",
    role: "Client",
  };

  const createdUser = await User.create(newClientTest);

  let newProfile = {
    fullName: "newClient",
    birthdate: "1998-03-29 13:34:00.000 +0700",
    gender: "Male",
    address: "Bekasi",
    photoProfile:
      "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
    phoneNumber: "082258852654",
    UserId: createdUser.id,
  };

  await Profile.create(newProfile);
});

// describe("New Client Test on Register Field", () => {
//   //TODO 1 Register Success
//   test("Register success should be return valid response", (done) => {
//     request(app)
//       .post("/register")
//       .send({
//         email: "newClient1@gmail.com",
//         password: "newClient",
//         role: "Client",
//         fullName: "newClient",
//         birthdate: "1998-03-29 13:34:00.000 +0700",
//         gender: "Male",
//         address: "Bekasi",
//         photoProfile:
//           "https://ik.imagekit.io/h8finalproject/profile_NmTGuU3dx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642523645332",
//         phoneNumber: "082258852654",
//         UserId: createdUser.id,
//       })
//       .then((res) => {
//         // console.log(res.status, `reqStatus`);
//         expect(res.status).toBe(201);
//         expect(res.body.email).toEqual("newClient1@gmail.com");
//         expect(res.body).toEqual({
//           id: res.body.id,
//           username: res.body.username,
//           email: res.body.email,
//           message: `Register ${res.body.username} as Customer successfully`,
//         });
//         done();
//       })
//       .catch((err) => {
//         console.log(err);
//         done(err);
//       });
//   });
// });

describe("New Client Test on Login Field", () => {
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
        console.log(res.body.access_token, `reqStatus`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ access_token: res.body.access_token });
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // TODO 2 Login password is Invalid
  test("Login password is null should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        email: "newClient1@gmail.com",
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        // console.log(res.body, `resBody`)
        expect(res.status).toBe(401);
        expect(res.body).toEqual({
          message: "Invalid email/password",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // TODO 3 Login email is Null
  test("Login email is null should be return invalid response", (done) => {
    request(app)
      .post("/login")
      .send({
        // email: "",
        password: "passwordInvalid",
        role: "Client",
      })
      .then((res) => {
        console.log(res.body, "resBody")
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: "Email/Password is required",
        });
        done();
      })
      .catch((err) => {
        console.log(err)
        done(err);
      });
  });
});

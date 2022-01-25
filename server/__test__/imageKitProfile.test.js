const app = require('../app')
const request = require('supertest');
const axios = require('axios');
const { User } = require("../models");

jest.mock('axios');


describe("Imagekit field", () => {


  beforeAll( async () => {
    await User.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    const response = {
      data: {
        url: "http://fakeImage.png"
      }
    }
    await axios.post.mockResolvedValue(response)
  })

  it("should create valid ", (done) => {
    request(app)
    .post("/register")
    .field("email", "imageKitTESTs@gmail.com")
    .field("password", "imageKitTEST")
    .field("role", "Client")
    .field("fullName", "imageKitTEST")
    .field("birthdate", "1998-03-29 13:34:00.000 +0700")
    .field("gender", "Male")
    .field("address", "Bekasi")
    .attach("photoProfile", './assets/photoprofile.png')
    .field("phoneNumber", "082258852654")
    .field("UserId", 1)
    .then((res) => {
      expect(res.body).toEqual(expect.any(Object));
      expect(res.body).toHaveProperty("id", 1);
      expect(res.body).toHaveProperty("fullName", "imageKitTEST");
      expect(res.body).toHaveProperty("email", "imageKitTESTs@gmail.com");
      return done ()
    })
    .catch((err) => {
      return done(err)
    })
  })

})
const app = require('../app')
const request = require('supertest');
const axios = require('axios');

jest.mock('axios');

describe("Imagekit field", () => {
  beforeAll(() => {
    const response = {
      url: "http://fakeImage.png"
    }
    axios.post.mockResolvedValue(response)
  })

  it("should create valid ", (done) => {
    request(app)
    .post("/register")
    .field("email", "imageKitTEST@gmail.com")
    .field("password", "imageKitTEST")
    .field("role", "Client")
    .field("fullName", "imageKitTEST")
    .field("birthdate", "1998-03-29 13:34:00.000 +0700")
    .field("gender", "Male")
    .field("address", "Bekasi")
    .attach("photoProfile", "ProfileUser.png")
    .field("phoneNumber", "082258852654")
    .field("UserId", 1)
    .then((res) => {
      console.log(res.body, "testOut");
      return done ()
    })
    .catch((err) => {
      return done(err)
    })
  })
})
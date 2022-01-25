const app = require('../app');
const request = require('supertest');
const axios = require('axios')
const { getToken } = require("../helpers/jwt");

const { User, sequelize } = require("../models");
const { queryInterface } = sequelize;

jest.mock('axios');
const userData = {
  email: "d@mail.com",
  password: "qweqwe",
  role: "client",
};
let adminToken= getToken(userData);

describe('Mocking upload resolve value for imagekit', () => {

  beforeAll((done) => {
    const response = {
      data: {
        url: "http://fake-img.com"
      }
    }
    axios.post.mockResolvedValue(response)
  });

  afterAll((done) => {
    queryInterface.bulkDelete(
      "Types",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    )
      .then(() =>
        queryInterface.bulkDelete(
          "Users",
          {},
          { truncate: true, restartIdentity: true, cascade: true }
        )
      )
      .then((_) => {
        done();
      })
      .catch((err) => done(err));
  });

  it('Should return image url', (done) => {
    const data = new axios();
    data
      .upload()
      .then(upload => {
        expect(upload.url).toBe('fake-image.png');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it('Should create new profile', (done) => {
    request(app)
      .post('/register')
      .field("email", "profile@gmail.com")
      .field("password", "profile")
      .field("role", "Client")
      .field("fullName", "profile")
      .field("birthdate", "5")
      .field("gender", "male")
      .field("address", "jl. soeharto")
      .field("photoProfile","https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg")
      .attach("phoneNumber", "09873")
      .set({
        access_token: adminToken,
      })
      .then(response => {
        console.log(response);
        const { body, status } = response;
        expect(status).toBe(201);
        // expect2 lainnya jangan lupa ditulis
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

});
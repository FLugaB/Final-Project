
const app = require('../app');
const request = require('supertest');
const ImageKit = require("imagekit");
const ImageKitFolder = require("../middlewere/imageKit");
const { User, DetailProduct, Product, sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");

jest.mock('imagekit');
let newAdmin = {
  email: "newAdmin@gmail.com",
  password: "newAdmin",
  role: "Admin",
};
let adminToken;

describe('Mocking upload resolve value for imagekit', () => {
  beforeAll(() => {
    ImageKit.mockImplementation(() => {
      return {
        upload: () => {
          return new Promise(resolve => {
            console.log("%c 🛸: resolve ", "font-size:16px;background-color:#9a4385;color:white;", resolve)
            resolve({
              url: 'fake-image.png'
            });
          });
        },
      };
    });
  });

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
    // ADMIN
    let newAdmin = {
      email: "newAdmin@gmail.com",
      password: "newAdmin",
      role: "Admin",
    };
    
    try {
      const createdAdmin = await User.create(newAdmin);
      let payloadAdmin = {
        id: createdAdmin.id,
        email: createdAdmin.email,
      };
      tokenAdmin = getToken(payloadAdmin);

      let wrongPayload = {
        id: 1000,
        email: "wrongEmail@gmail.com",
      };
      tokenPayloadInvalid = getToken(wrongPayload);
      
    } catch (err) {
      console.log(err);
    }
  
  })

  it('Should return image url', (done) => {
    const imgKit = new ImageKit();
    imgKit
      .upload()
      .then(upload => {
      console.log("%c 📍: upload ", "font-size:16px;background-color:#634900;color:white;", upload)
        expect(upload.url).toBe('fake-image.png');
        done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });

  it('Should create new accommodation', (done) => {
    request(app)
      .post('/cms/products')
      .set('access_token', tokenAdmin)
      .field("title", "Skincare Product")
      .field("type", "Product Skincare")
      .field("name", "VASELINE Lip Theraphy Jar")
      .field("price", 20000)
      .field("category", "Lip care")
      .field("stock", 3)
      .attach("imageUrl", "test/hotel.jpeg")
      .set({
        access_token: adminToken,
      })
      .then(response => {
        console.log(response);
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body.name).toBe("Hotel Bagus");
        // expect2 lainnya jangan lupa ditulis
        return done();
      })
      .catch(err => {
        return done(err);
      });
  });

});


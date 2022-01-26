const app = require("../app");
const request = require("supertest");
const { videoDaily } = require('../controllers/videoDaily.js');

const API_KEY =
  "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b570552b4e";

const API_KEY_WRONG =
  "6a879d7e4dd4d3d5824dded02867527f781a72b79a1ada7bb665e0b5705547854";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};
const headersWrong = {
  ...headers,
  Authorization: "Bearer " + API_KEY_WRONG,
};

const headerTokenCustomers = {
  authorization: "Bearer " + API_KEY,
  "content-type": "application/json",
  "Content-Type": "application/json; charset=UTF-8",
};

describe("Thrid API Daily.co Video Chat Field", () => {
  //TODO 1 Get Room API Daily.co
  test("Get Room API Daily.co should be return valid response", (done) => {
    request(app)
      .get("/video-call-owner/DrVera")
      .set(headers)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toEqual({
          token: res.body.token,
          room: expect.any(Object),
        });
        expect(res.body.room).toEqual(expect.any(Object));
        expect(res.body.room).toHaveProperty("name", "DrVera");
        expect(res.body.room).toHaveProperty("privacy", "private");
        expect(res.body.room.config).toHaveProperty("max_participants", 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  //TODO 2 Get Room API Daily.co
  test("Get Room API Daily.co should be return valid response", (done) => {
    request(app)
      .post("/video-call/DrVera")
      .set(headers, headerTokenCustomers)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// //TODO 3 Get Room API Daily.co error handler
// describe("Thrid API Daily.co Video Chat Error Handler Field", () => {
//   test("Get Room API Daily.co error handler should be return invalid response", (done) => {
//     jest.spyOn(videoDaily).mockRejectedValue("Error");
//     request(app)
//       .get("/video-call/DrVera")
//       .then((res) => {
//         expect(res.status).toBe(500);

//         expect(res.body.err).toBe("Error");
//         done()
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

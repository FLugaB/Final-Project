// const app = require("../");
// const request = require("supertest");
// const { Schedule, User } = require("../models");
// const { getToken } = require("../helpers/jwt");

// let tokenDoctor
// const doctorList = [
//   {
//     "email": "doctor1@mail.com",
//     "password": "doctor",
//     "sip": "123/doctor/2025",
//     "role": "Doctor"
// },
// {
//     "email": "doctor2@mail.com",
//     "password": "doctor",
//     "sip": "123/doctor/2025",
//     "role": "Doctor"
// },
// {
//     "email": "doctor3@mail.com",
//     "password": "doctor",
//     "sip": "123/doctor/2025",
//     "role": "Doctor"
// }
// ]

// const scheduleList = [
//   {
//     "day": "selasa",
//     "hour": "09.00 - 11.00",
//     "price": 145000,
//     "hospital": "RS Unggul Karsa Medika",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "kamis",
//     "hour": "09.00 - 11.00",
//     "price": 145000,
//     "hospital": "RS Unggul Karsa Medika",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "jumat",
//     "hour": "09.00 - 11.00",
//     "price": 145000,
//     "hospital": "RS Unggul Karsa Medika",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "senin",
//     "hour": "16.00 - 18.00",
//     "price": 100000,
//     "hospital": "Siloam Hospitals Purwakarta",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "selasa",
//     "hour": "16.00 - 18.00",
//     "price": 100000,
//     "hospital": "Siloam Hospitals Purwakarta",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "rabu",
//     "hour": "16.00 - 18.00",
//     "price": 100000,
//     "hospital": "Siloam Hospitals Purwakarta",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   },
//   {
//     "day": "kamis",
//     "hour": "16.00 - 18.00",
//     "price": 100000,
//     "hospital": "Siloam Hospitals Purwakarta",
//     "UserId": 4,
//     "ScheduleTagId": 0
//   }
// ]

// afterAll(async () => {

//   await User.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,

//   });
//   await Schedule.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,

//   });
// })
// beforeAll(async() => {
//   const newDoctor  = {
//     email: "doctor@gmail.com",
//     password: "doctor",
//     role: "Doctor"
//   }

//   const createdDoctor = User.create(newDoctor);
//     let payload3 = {
//       id: createdDoctor.id,
//       email: createdDoctor.email,
//     };
//     doctorToken = getToken(payload3);
//     await User.bulkCreate(doctorList)
//     await Schedule.bulkCreate(scheduleList)

// })

// describe("success get schedules doctor", () => {
//   //TODO 1 success get schedules doctor
//   test("success get schedules if day doctor", (done) => {
//   request(app)  
//     .get("/doctors-chat")
//     .set("access_token", doctorToken)
//     .send ({  
//       "day": "selasa", 
//       })
//     .then((res) => {
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual(expect.any(Object))
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
//   });

//     //TODO 2 show product  
//     test("show product ", (done) => {
//       request(app)
//         .get("/doctors-chat")
//         .then((res) => {
//           expect(res.status).toBe(200);
//           expect(res.body).toEqual(expect.any(Object))
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });

//   //TODO 4 show product  if day
//   test("show product if no schedules", (done) => {
//     request(app)
//       .get("/doctors-chat")
//       .send ({  
//         "day": "minggu", 
//         })
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty('message', "there is no schedule")
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// })

// describe("success add schedules doctor", () => {
//   //TODO 1 success add product
//   test("success create ", (done) => {
//     request(app)
//     .post("/cms/products")
//     .set('access_token', tokenMatch1)
//     .send ({  
//         "title": "Chat consultation", 
//         "type": "Ticket Chat",
//         "name": "Ticket Consultation",
//         "price": 240000,
//         "category": "Ticket",
//         "stock": 7,
//         "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
//         "description": "Ticket Counsultation via Chat"
//     })
//     .then((resp) => {
//       console.log(resp,">>>>>>>>ini re");
//       expect(resp.body).toEqual(expect.any(Object))
//       expect(resp.status).toBe(201)
//       done()
//     })   
//     .catch((err => {
//       console.log (err,">>>>>>>>>>>>err")
//       done(err)
//     }))
//   })

//   //TODO 2 add title is empty
//   test("add title is empty should be return invalid response", (done) => {
//     request(app)
//       .post("/cms/products")
//       .set("access_token", tokenMatch1)
//       .send({
//         title: "",
//         type: "ticket chat",
//         name: "Ticket Consultation",
//         price: 240000,
//         category: "Ticket",
//         stock: 0,
//         imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
//         description: "Ticket Counsultation via Chat"
//       })
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual(expect.any(Object));
//         expect(res.body).toHaveProperty("message", "Title is required");
//         done();
//       }) 
//       .catch((err) => {
//         done(err);
//       });
//   });

//   //TODO 3 add title is null
//   test("add title is null should be return invalid response", (done) => {
//     request(app)
//       .post("/cms/products")
//       .set("access_token", tokenMatch1)
//       .send({
//         type: "ticket chat",
//         name: "Ticket Consultation",
//         price: 240000,
//         category: "Ticket",
//         stock: 0,
//         imageUrl: "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
//         description: "Ticket Counsultation via Chat"
//       })
//       .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body).toEqual(expect.any(Object));
//         expect(res.body).toHaveProperty("message", "Title is required");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });


//   //TODO 1 no access_token add product
//   test("no access_token add product ", (done) => {
//     request(app)
//     .post("/cms/products")
//     .send ({
//         "title": "Chat consultation", 
//         "type": "Ticket Chat",
//         "name": "Ticket Consultation",
//         "price": 240000,
//         "category": "Ticket",
//         "stock": 0,
//         "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
//         "description": "Ticket Counsultation via Chat"
      
//     })
//     .then((resp) => {
//       console.log(resp,">>>>>>>>ini re");
//       expect(resp.body).toEqual(expect.any(Object))
//       expect(resp.status).toBe(403)
//       done()
//     })   
//     .catch((err => {
//       console.log (err,">>>>>>>>>>>>err")
//       done(err)
//     }))
//   })

//   //TODO 1 invalid access_token add product
//   test(" invalid access_token add product ", (done) => {
//     request(app)
//     .post("/cms/products")
//     .set('access_token', 'fjj566ff')
//     .send ({
//         "title": "Chat consultation", 
//         "type": "Ticket Chat",
//         "name": "Ticket Consultation",
//         "price": 240000,
//         "category": "Ticket",
//         "stock": 0,
//         "imageUrl": "https://www.soco.id/cdn-cgi/image/w=425,format=auto,dpr=1.45/https://images.soco.id/image-0-1595500867038",
//         "description": "Ticket Counsultation via Chat"
      
//     })
//     .then((resp) => {
//       console.log(resp,">>>>>>>>ini re");
//       expect(resp.body).toEqual(expect.any(Object))
//       expect(resp.status).toBe(401)
//       done()
//     })   
//     .catch((err => {
//       console.log (err,">>>>>>>>>>>>err")
//       done(err)
//     }))
//   })
// })
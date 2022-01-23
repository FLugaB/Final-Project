const app = require("../");
const request = require("supertest");
const { Doctor } = require("../models");
const { getToken } = require("../helpers/jwt");

let tokenDoctor
const list = [
  {
    "email": "doctor1@mail.com",
    "password": "doctor",
    "sip": "123/doctor/2025",
    "role": "Doctor"
},
{
    "email": "doctor2@mail.com",
    "password": "doctor",
    "sip": "123/doctor/2025",
    "role": "Doctor"
},
{
    "email": "doctor3@mail.com",
    "password": "doctor",
    "sip": "123/doctor/2025",
    "role": "Doctor"
}
]

beforeAll(async () => {
  await Doctor.destroy({
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
  try {
    const result = User.create(newDoctor) 
  } catch (err) {
    console.log(err);
  }

  const createdDoctor = await User.create(newDoctor);
    let payload3 = {
      id: createdDoctor.id,
      email: createdDoctor.email,
    };
    doctorToken = getToken(payload3);

  

})
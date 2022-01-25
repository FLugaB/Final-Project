const { User, Profile } = require('./models')
const bcrypt = require('bcrypt')
const app = require('./app')
const request = require('supertest')

describe('Testing user', () => {
  beforeAll(async () => {
    await User.create({
      email: "newClient1@gmail.com",
      password: "newClient",
      role: "Client",
    })
    await Profile.create({
      fullName: "newClient",
      birthdate: "1998-03-29 13:34:00.000 +0700",
      gender: "Male",
      address: "Bekasi",
      photoProfile: defaultImage,
      phoneNumber: "082258852654",
      UserId: createdUser.id,
    })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(async () => {
    await User.destroy({ truncate: true })
  })

  it('Should handle error when hit findAll', async () => {
    // User.findAll = jest.fn().mockRejectedValue('Error')

    jest.spyOn(User, 'findOne').mockRejectedValue('Error')

    return request(app)
      .get('/')
      .then((res) => {
        expect(res.status).toBe(500)

        expect(res.body.err).toBe('Error')
      })
      .catch((err) => {
        console.log(err)
      })
  })

  it('Should find all user', async () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.status).toBe(200)

        console.log(res.body, '<<<<')

        expect(res.body.length).toBe(1)
        expect(res.body.username).toBe("semver")
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
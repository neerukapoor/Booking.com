import request from 'supertest'
import app from '../app'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env.test.local' })
import mongoose from 'mongoose'

beforeAll(() => {
  if (process.env.MONGODB_CONNECTION) {
    mongoose
      .connect(process.env.MONGODB_CONNECTION)
      .then(async () => {
        console.log('Connected to MongoDB')
        await mongoose.connection.db.dropCollection('users')
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB: ' + error)
      })
  } else {
    console.log('Error Connecting to MongoDb, connection string is not present')
  }
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Auth Routes', () => {
  it('should sign up a new user', async () => {
    const email = 'testuserneeru@gmail.com'
    const password = 'testpassword'
    const signRes = await request(app)
      .post('/admin/signup')
      .send({ email, password })

    expect(signRes.status).toBe(201)
    expect(signRes.body.status).toBe('success')
    expect(signRes.body.token).toBeDefined()

    const loginRes = await request(app)
      .post('/admin/login')
      .send({ email, password })

    expect(loginRes.status).toBe(200)
    expect(loginRes.body.status).toBe('success')
    expect(loginRes.body.token).toBeDefined()
  })
})

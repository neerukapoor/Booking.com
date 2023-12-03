import request from 'supertest';
import app from '../app'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env.test.local' })
import mongoose from 'mongoose';

if (process.env.MONGODB_CONNECTION) {
  mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB: ' + error)
    })
} else {
  console.log('Error Connecting to MongoDb, connection string is not present')
}

describe('Auth Routes', () => {
    it('should sign up a new user', async () => {
      const response = await request(app)
        .post('/admin/signup')
        .send({ username: 'testuserneeru', password: 'testpassword' });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Singup Successful');
      expect(response.body.jwtToken).toBeDefined();
    });
});
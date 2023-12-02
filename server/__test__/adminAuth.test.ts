import request from 'supertest';
import express from 'express';
import router from '../routes/adminAuth'

const app = express();
app.use(express.json());
app.use('/auth', router);

describe('Auth Routes', () => {
    it('should sign up a new user', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({ username: 'testuser', password: 'testpassword' });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Singup Successful');
      expect(response.body.jwtToken).toBeDefined();
    });
});
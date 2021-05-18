import request from 'supertest';
import { app } from '../../app';

const http = request(app);

it('responds with details about the current user', async () => {
  const authResponse = await http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await http
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

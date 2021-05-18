import request from 'supertest';
import { app } from '../../app';

const http = request(app);

it('fails when an email that does not exists is supplied', async () => {
  await http
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'ijfowiej'
    })
    .expect(400)
});

it('fails when an incorrect password is supplied', async () => {
  await http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await http
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'fweaefwfa'
    })
    .expect(400)
});

it('responds with a cookie when given a valid credentials', async () => {
  await http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await http
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

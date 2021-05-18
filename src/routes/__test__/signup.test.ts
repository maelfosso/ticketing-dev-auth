import request from 'supertest';
import { app } from '../../app';

const http = request(app);

it('returns a 201 on successful signup', async () => {
  return http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return http
    .post('/api/users/signup')
    .send({
      email: 'ajofi;jawe',
      password: 'password'
    })
    .expect(400)
});

it('returns a 400 with an invalid password', async () => {
  return http
    .post('/api/users/signup')
    .send({
      email: 'ajofi;jawe',
      password: 'pa'
    })
    .expect(400)
});

it('returns a 400 with missing email an password', async () => {
  return http
    .post('/api/users/signup')
    .send({})
    .expect(400)
});

it('disallows duplicate email', async () => {
  await http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
  await http
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

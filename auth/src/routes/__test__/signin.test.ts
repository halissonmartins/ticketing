import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful signin', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
});

it('returns a 400 with an invalid email', async () => {

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with missing email an password', async () => {

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({
      password: 'password'
    })
    .expect(400);

  return request(app)
    .post('/api/users/signin')
    .send({})
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when a email that does not exist is supplied', async () => {

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(400);
});

it('fails when an incorrect is supplied', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password1'
    })
    .expect(400);
});
import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../index';

import User from '../../types/user.type';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('User Handler', () => {
  const userData: User = {
      email: 'm@s.com',
      user_name: 'mo_ramadan',
      first_name: 'mo',
      last_name: 'ramadan',
      password: 'm10m20r30r40',
  };

  let token: string,
    userId = 1;

  it('should require authorization on every endpoint', (done) => {
    request.get('/users').then((res) => {
      expect(res.status).toBe(401);
      done();
    });

    request.get(`/users/${userId}`).then((res) => {
      expect(res.status).toBe(401);
      done();
    });

    request
      .put(`/users/${userId}`)
      .send({
        firstName: userData.first_name + 'test',
        lastName: userData.last_name + 'test',
      })
      .then((res) => {
        expect(res.status).toBe(401);
        done();
      });

    request.delete(`/users/${userId}`).then((res) => {
      expect(res.status).toBe(401);
      done();
    });
  });

  it('gets the create endpoint', (done) => {
    request
      .post('/users')
      .send(userData)
      .then((res) => {
        const { body, status } = res;
        token = body;

        // @ts-ignore
        const { user } = jwt.verify(token, SECRET);
        userId = user.id;

        expect(status).toBe(200);
        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request
      .get('/users')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the read endpoint', (done) => {
    request
      .get(`/users/${userId}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the update endpoint', (done) => {
    const newUserData: User = {
      ...userData,
      first_name: 'mo',
      last_name: 'ramadan',
    };

    request
      .put(`/users/${userId}`)
      .send(newUserData)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the auth endpoint', (done) => {
    request
      .post('/users/auth')
      .send({
        username: userData.user_name,
        password: userData.password,
      })
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the auth endpoint with wrong password', (done) => {
    request
      .post('/users/auth')
      .send({
        username: userData.user_name,
        password: 'wrongpw',
      })
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(401);
        done();
      });
  });

  it('gets the delete endpoint', (done) => {
    request
      .delete(`/users/${userId}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../index';

import User from '../../types/user.type';
import { BaseProduct } from '../../types/product.type';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('Product Handler', () => {
  const product: BaseProduct = {
     name: 'product 100',
      price: 100,
  };


  let token: string, userId: number, productId: number;

  beforeAll(async () => {
    const userData: User = {
       email: 'm@s.com',
      user_name: 'mo_ramadan',
      first_name: 'mo',
      last_name: 'ramadan',
      password: 'm10m20r30r40',
    };

    const { body } = await request.post('/users').send(userData);

    token = body;

    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    userId = user.id;
  });

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set('Authorization', 'bearer ' + token);
  });

  it('gets the create endpoint', (done) => {
    request
      .post('/products')
      .send(product)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { body, status } = res;

        expect(status).toBe(200);

        productId = body.id;

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request.get('/products').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets the read endpoint', (done) => {
    request.get(`/products/${productId}`).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets the update endpoint', (done) => {
    const newProductData: BaseProduct = {
      ...product,
      name: 'CodeMerge 156 A',
      price: 1299,
    };

    request
      .put(`/products/${productId}`)
      .send(newProductData)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the delete endpoint', (done) => {
    request
      .delete(`/products/${productId}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

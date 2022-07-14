import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../index';
import { BaseOrder } from '../../types/order.type';
import User from '../../types/user.type';
import { BaseProduct } from '../../types/product.type';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('Order Handler', () => {
  let token: string, order: BaseOrder, user_id: number, product_id: number, order_id: number;
  beforeAll(async () => {
    const userData: User = {
      email: 'm@s.com',
      user_name: 'mo_ramadan',
      first_name: 'mo',
      last_name: 'ramadan',
      password: 'm10m20r30r40',
    };
    const productData: BaseProduct = {
      name: 'product 100',
      price: 100,
    };

    const { body: userBody } = await request.post('/users').send(userData);

    token = userBody;

    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    user_id = user.id;

    const { body: productBody } = await request
      .post('/products')
      .set('Authorization', 'bearer ' + token)
      .send(productData);
    product_id = productBody.id;

    order = {
      products: [
        {
          product_id,
          quantity: 5,
        },
      ],
      user_id,
      status: true,
    };
  });

  afterAll(async () => {
    await request.delete(`/users/${user_id}`).set('Authorization', 'bearer ' + token);
    await request.delete(`/products/${product_id}`).set('Authorization', 'bearer ' + token);
  });

  it('gets the create endpoint', (done) => {
    request
      .post('/orders')
      .send(order)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { body, status } = res;

        expect(status).toBe(200);

        order_id = body.id;

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request
      .get('/orders')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the read endpoint', (done) => {
    request
      .get(`/orders/${order_id}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the update endpoint', (done) => {
    const newOrder: BaseOrder = {
      ...order,
      status: false,
    };

    request
      .put(`/orders/${order_id}`)
      .send(newOrder)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the delete endpoint', (done) => {
    request
      .delete(`/orders/${order_id}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

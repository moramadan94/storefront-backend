import OrderStore from '../../models/order.model';
import UserStore from '../../models/user.model';
import ProductStore from '../../models/product.model';

import { BaseOrder, Order } from '../../types/order.type';
import User from '../../types/user.type';
import { Product } from '../../types/product.type';

const OrderStoreInstance = new OrderStore();

describe('Order Model', () => {
  const UserStoreInstance = new UserStore();
  const ProductStoreInstance = new ProductStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let order: BaseOrder, user_id: any, product_id: number;

  async function createOrder(order: BaseOrder) {
    return OrderStoreInstance.create(order);
  }

  async function deleteOrder(id: number) {
    return OrderStoreInstance.deleteOrder(id);
  }

  beforeAll(async () => {
    const user: User = await UserStoreInstance.create({
        email: 'm@s.com',
      user_name: 'mo_ramadan',
      first_name: 'mo',
      last_name: 'ramadan',
      password: 'm10m20r30r40',
    });

    user_id = user.id;

    const product: Product = await ProductStoreInstance.create({
      name: 'Product',
      price: 100,
    });

    product_id = product.id;

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
    await UserStoreInstance.deleteUser(user_id);
    await ProductStoreInstance.deleteProduct(product_id);
  });

  it('should have an index method', () => {
    expect(OrderStoreInstance.getOrders).toBeDefined();
  });

  it('should have a show method', () => {
    expect(OrderStoreInstance.read).toBeDefined();
  });

  it('should have a add method', () => {
    expect(OrderStoreInstance.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(OrderStoreInstance.deleteOrder).toBeDefined();
  });

  it('add method should add a order', async () => {
    const createdOrder: Order = await createOrder(order);

    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });

    await deleteOrder(createdOrder.id);
  });

  it('index method should return a list of orders', async () => {
    const createdOrder: Order = await createOrder(order);
    const orderList = await OrderStoreInstance.getOrders();

    expect(orderList).toEqual([createdOrder]);

    await deleteOrder(createdOrder.id);
  });

  it('show method should return the correct orders', async () => {
    const createdOrder: Order = await createOrder(order);
    const orderFromDb = await OrderStoreInstance.read(createdOrder.id);

    expect(orderFromDb).toEqual(createdOrder);

    await deleteOrder(createdOrder.id);
  });

  it('update method should update the order', async () => {
    const createdOrder: Order = await createOrder(order);
    const newOrderData: BaseOrder = {
      products: [
        {
          product_id,
          quantity: 200,
        },
      ],
      user_id,
      status: false,
    };

    const { products, status } = await OrderStoreInstance.update(createdOrder.id, newOrderData);

    expect(products).toEqual(newOrderData.products);
    expect(status).toEqual(newOrderData.status);

    await deleteOrder(createdOrder.id);
  });

  it('delete method should remove the order', async () => {
    const createdOrder: Order = await createOrder(order);

    await deleteOrder(createdOrder.id);

    const orderList = await OrderStoreInstance.getOrders();

    expect(orderList).toEqual([]);
  });
});

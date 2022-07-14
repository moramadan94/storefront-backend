import { Request, Response } from 'express';
import OrderStore from '../models/order.model';
import { Order, OrderProduct } from '../types/order.type';

const OrderInstance = new OrderStore();

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await OrderInstance.getOrders();

    res.json(orders);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;

    if (products === undefined || status === undefined || user_id === undefined) {
      res.status(400);
      res.send('Some required parameters are missing! eg. :products, :status, :user_id');
      return false;
    }

    const order: Order = await OrderInstance.create({ products, status, user_id });
    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    const order: Order = await OrderInstance.read(id);

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;

    if (products === undefined || status === undefined || user_id === undefined || id === undefined) {
      res.status(400);
      res.send('Some required parameters are missing! eg. :products, :status, :user_id, :id');
      return false;
    }

    const order: Order = await OrderInstance.update(id, { products, status, user_id });

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    await OrderInstance.deleteOrder(id);

    res.send(`Order with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

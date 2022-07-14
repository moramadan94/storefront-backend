import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { Product } from '../types/product.type';

const ProductInstance = new ProductModel();

export const products = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await ProductInstance.getProducts();
    res.json(products);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;
    if (name === undefined || price === undefined) {
      res.status(400);
      res.send('required parameters are missing!');
      return false;
    }

    const product: Product = await ProductInstance.create({ name, price });

    res.json(product);
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
      res.send('Missing required parameter');
      return false;
    }

    const product: Product = await ProductInstance.read(id);

    res.json(product);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;

    if (name === undefined || price === undefined || id === undefined) {
      res.status(400);
      res.send('required parameters are missing!');
      return false;
    }

    const product: Product = await ProductInstance.update(id, { name, price });

    res.json(product);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter');
      return false;
    }

    await ProductInstance.deleteProduct(id);

    res.send(`Product with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

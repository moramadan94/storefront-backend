import db from '../database';
import { Product, BaseProduct } from '../types/product.type';

export default class ProductModel {
  async getProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM products';

      const { rows } = await connection.query(sql);

      connection.release();

      return rows;
    } catch (err) {
      throw new Error(`Could not get products. ${err}`);
    }
  }

  async create(product: BaseProduct): Promise<Product> {
    const { name, price } = product;
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(sql, [name, price]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${name}. ${err}`);
    }
  }

  async read(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(sql, [id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`);
    }
  }

  async update(id: number, newProductData: BaseProduct): Promise<Product> {
    const { name: newName, price } = newProductData;

    try {
      const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
      const connection = await db.connect();
      const { rows } = await connection.query(sql, [newName, price, id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${name}. ${err}`);
    }
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const connection = await db.connect();
      const { rows } = await connection.query(sql, [id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. ${err}`);
    }
  }
}

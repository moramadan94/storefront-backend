import ProductStore from '../../models/product.model';
import { Product, BaseProduct } from '../../types/product.type';
const ProductStoreInstance = new ProductStore();

describe('Product Model', () => {
  const product: BaseProduct = {
    name: 'CodeMaster 3000',
    price: 2000,
  };

  async function createProduct(product: BaseProduct) {
    return ProductStoreInstance.create(product);
  }

  async function deleteProduct(id: number) {
    return ProductStoreInstance.deleteProduct(id);
  }

  it('should have an index method', () => {
    expect(ProductStoreInstance.getProducts).toBeDefined();
  });

  it('should have a show method', () => {
    expect(ProductStoreInstance.read).toBeDefined();
  });

  it('should have a add method', () => {
    expect(ProductStoreInstance.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(ProductStoreInstance.deleteProduct).toBeDefined();
  });

  it('add method should add a product', async () => {
    const createdProduct: Product = await createProduct(product);

    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });

    await deleteProduct(createdProduct.id);
  });

  it('index method should return a list of products', async () => {
    const createdProduct: Product = await createProduct(product);
    const productList = await ProductStoreInstance.getProducts();

    expect(productList).toEqual([createdProduct]);

    await deleteProduct(createdProduct.id);
  });

  it('show method should return the correct product', async () => {
    const createdProduct: Product = await createProduct(product);
    const productFromDb = await ProductStoreInstance.read(createdProduct.id);

    expect(productFromDb).toEqual(createdProduct);

    await deleteProduct(createdProduct.id);
  });

  it('update method should update the product', async () => {
    const createdProduct: Product = await createProduct(product);
    const newProductData: BaseProduct = {
      name: 'CodeMaster 9999',
      price: 9999,
    };

    const { name, price } = await ProductStoreInstance.update(createdProduct.id, newProductData);

    expect(name).toEqual(newProductData.name);
    expect(price).toEqual(newProductData.price);

    await deleteProduct(createdProduct.id);
  });

  it('delete method should remove the product', async () => {
    const createdProduct: Product = await createProduct(product);

    await deleteProduct(createdProduct.id);

    const productList = await ProductStoreInstance.getProducts();

    expect(productList).toEqual([]);
  });
});

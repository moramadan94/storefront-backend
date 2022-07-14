type BaseProduct = {
  name: string;
  price: number;
};

type Product = BaseProduct & { id: number };

export { Product, BaseProduct };

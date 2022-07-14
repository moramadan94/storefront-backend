type OrderProduct = {
  product_id: number;
  quantity: number;
};

type BaseOrder = {
  products: OrderProduct[];
  user_id: number;
  status: boolean;
};

type Order = BaseOrder & { id: number };

export { Order, BaseOrder, OrderProduct };

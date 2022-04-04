export interface Order {
  user_id: string;
  orders: {
    product_id: string;
    count: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: string[];
  total: number;
  status: string;
  createdAt: string;
}

export interface OrdersData {
  orders: Order[];
}

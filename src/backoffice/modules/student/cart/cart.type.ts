export interface CartItem {
  id: string;
  title: string;
  image: string;
  type: string;
  price: number;
}

export interface OrderSummary {
  items: number;
  totalPrice: number;
}

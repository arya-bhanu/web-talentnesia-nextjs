export interface CartItem {
    title: string;
    price: string;
    quantity: string;
    image: string;
    type: string;
  }
  
  export interface OrderSummary {
    totalItems: number;
    totalPrice: string;
  }
  
import { CartItem, OrderSummary } from './cart.type';

export const cartItems: CartItem[] = [
  {
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 'Rp2,000.000',
    quantity: '2',
    type: "Course",
    image: '/img/cart/cart.png',
  },
  {
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 'Rp2,000.000',
    quantity: '1',
    type: "Course",
    image: '/img/cart/cart.png',
  },
  {
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 'Rp2,000.000',
    quantity: '1',
    type: "Course",
    image: '/img/cart/cart.png',
  },
];

export const orderSummary: OrderSummary = {
  totalItems: 3,
  totalPrice: '$3,097',
};

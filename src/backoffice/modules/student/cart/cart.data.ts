import { CartItem, OrderSummary } from './cart.type';

// Data dummy untuk item di keranjang
export const cartItems: CartItem[] = [
  {
    id: '1',
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 2000000, // Gunakan format angka
    type: 'Course',
    image: '/img/cart/cart.png',
  },
  {
    id: '2',
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 2000000, // Gunakan format angka
    type: 'Course',
    image: '/img/cart/cart.png',
  },
  {
    id: '3',
    title: 'Animasi 3D For Beginners - Become to Expert',
    price: 2000000, // Gunakan format angka
    type: 'Course',
    image: '/img/cart/cart.png',
  },
];

// Data dummy untuk ringkasan pesanan
export const orderSummary: OrderSummary = {
  items: cartItems.length,
  totalPrice: cartItems.reduce((total, item) => total + item.price, 0),
};

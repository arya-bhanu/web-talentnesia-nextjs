import React from 'react';
import { CartItem, OrderSummary } from './cart.type';
import Trash from '@/../public/icons/trash.svg';
import CodeReedem from './components/code-reedem';
import Rating from './components/rating';

interface CartViewProps {
  cartItems: CartItem[];
  orderSummary: OrderSummary;
  onIncrement: (item: CartItem) => void;
  onDecrement: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  selectAll: boolean;
  selectedItems: boolean[];
  onSelectAll: () => void;
  onSelectItem: (index: number) => void;
}

const CartView: React.FC<CartViewProps> = ({
  cartItems,
  orderSummary,
  onIncrement,
  onDecrement,
  onRemove,
  selectAll,
  selectedItems,
  onSelectAll,
  onSelectItem,
}) => {
  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white sm:text-xl py-4">
                {cartItems.length} Items In Cart
              </h2>
              <button
                type="button"
                className="text-sm font-medium text-gray-900 dark:text-white sm:text-xl py-4 underline"
              >
                Continue Buying
              </button>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="select-all"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 mr-2 cursor-pointer"
                      checked={selectAll}
                      onChange={onSelectAll}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-base font-semibold text-gray-500 dark:text-white"
                    >
                      Course
                    </label>
                  </div>
                  <div className="flex-none flex">
                    <div className="text-base font-semibold text-gray-500 dark:text-white text-center mr-10">
                      Type
                    </div>
                    <div className="text-base font-semibold text-gray-500 dark:text-white text-center mr-2">
                      Price
                    </div>
                    <div className="text-base font-semibold text-gray-500 dark:text-white text-center ml-4">
                      Remove
                    </div>
                  </div>
                </div>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col lg:flex-row lg:items-start lg:space-x-6 p-4 mb-4 bg-white shadow-sm"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`cart-item-${index}`}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 mr-4"
                        checked={selectedItems[index]}
                        onChange={() => onSelectItem(index)}
                      />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <CodeReedem />
                  </div>
                  <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md flex flex-col lg:flex-row lg:items-center lg:space-x-2 lg:pl-2">
                    <div className="flex flex-col flex-1">
                      <a
                        href="#"
                        className="text-base font-bold text-gray-700 hover:underline dark:text-white"
                      >
                        {item.title.length > 10
                          ? `${item.title.slice(0, 10)}...`
                          : item.title}
                      </a>
                      <Rating rating={4.5} />
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-white flex flex-col lg:flex-row lg:space-x-6 lg:items-center">
                      <p className="text-sm font-semibold text-gray-600 dark:text-white">
                        {item.type}
                      </p>
                      <p className="text-sm font-semibold text-gray-600 dark:text-white">
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4 lg:mt-0">
                      <Trash className="text-gray-500 dark:text-gray-300 cursor-pointer mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:w-80">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                Order Summary
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-700 dark:text-white">
                    Items ({orderSummary.items}):
                  </p>
                  <p className="text-base font-medium text-gray-700 dark:text-white">
                    Rp {orderSummary.totalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-700 dark:text-white">
                    Platform Charge (2%):
                  </p>
                  <p className="text-base font-medium text-gray-700 dark:text-white">
                    Rp 10.000
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                <div className="flex justify-between">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    Total:
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    Rp {(orderSummary.totalPrice + 10000).toLocaleString()}
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300 dark:border-gray-600 mb-5" />
                <div className="flex items-start mt-4 space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Dengan melakukan pemesanan, Anda setuju dengan{' '}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      kebijakan privasi
                    </span>{' '}
                    perusahaan dan{' '}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline">
                      ketentuan penggunaan
                    </span>
                    .
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-transparent text-[#323232] border-[#FFC862] bg-[#FFC862] hover:bg-[#ffbb3d] px-4 py-2 text-base font-medium shadow-sm focus:outline-none"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartView;

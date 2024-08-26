"use client";

import React, { useState } from 'react';
import CartView from './Cart.view';
import { cartItems, orderSummary } from './cart.data';
import { CartItem } from './cart.type';

const Cart: React.FC = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<boolean[]>(Array(cartItems.length).fill(false));

  const handleIncrement = (item: CartItem) => {
    // Handle increment logic
  };

  const handleDecrement = (item: CartItem) => {
    // Handle decrement logic
  };

  const handleRemove = (item: CartItem) => {
    // Handle remove logic
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedItems(Array(cartItems.length).fill(newSelectAll));
  };

  const handleSelectItem = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);

    if (!updatedSelectedItems.includes(false)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  return (
    <CartView
      cartItems={cartItems}
      orderSummary={orderSummary}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onRemove={handleRemove}
      selectAll={selectAll}
      selectedItems={selectedItems}
      onSelectAll={handleSelectAll}
      onSelectItem={handleSelectItem}
    />
  );
};

export default Cart;

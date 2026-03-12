"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children, initialCart }) {
  const [cartItems, setCartItems] = useState(initialCart?.cartItems || []);
  const [shippingFee] = useState(initialCart?.shipping_fee || 50);
  const [discount] = useState(initialCart?.discount_applied || 0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingFee - discount;

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingFee,
        discount,
        subtotal,
        grandTotal,
        shippingInfo,
        setShippingInfo,
        orderPlaced,
        setOrderPlaced,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
}

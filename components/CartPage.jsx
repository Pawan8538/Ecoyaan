"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cartItems,
    shippingFee,
    discount,
    subtotal,
    grandTotal,
    updateQuantity,
    removeItem,
  } = useCheckout();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-500">Your cart is empty</h2>
        <p className="text-muted mt-2">Add some eco-friendly products to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        <p className="text-muted text-sm mb-6">{cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart</p>

        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-accent flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.product_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg leading-tight truncate">
                {item.product_name}
              </h3>
              <p className="text-primary font-bold text-lg mt-1">₹{item.product_price}</p>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-medium transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Line total + Remove */}
            <div className="flex flex-col items-end gap-2">
              <p className="font-bold text-lg">₹{item.product_price * item.quantity}</p>
              <button
                onClick={() => removeItem(item.product_id)}
                className="text-red-400 hover:text-red-600 transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-card-bg rounded-xl border border-border p-6 sticky top-24 mt-20">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span className="font-medium">₹{shippingFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <hr className="border-border" />
            <div className="flex justify-between text-base font-bold">
              <span>Grand Total</span>
              <span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/shipping")}
            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 cursor-pointer"
          >
            Proceed to Checkout →
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

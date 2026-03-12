"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const {
    cartItems,
    shippingFee,
    discount,
    subtotal,
    grandTotal,
    shippingInfo,
    orderPlaced,
    setOrderPlaced,
  } = useCheckout();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  // Redirect if no shipping info
  if (!shippingInfo && !orderPlaced) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">
          Please complete shipping details first
        </h2>
        <button
          onClick={() => router.push("/shipping")}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Go to Shipping
        </button>
      </div>
    );
  }

  // Success State
  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Successful! 🎉</h1>
        <p className="text-muted mb-6">
          Thank you for shopping sustainably with Ecoyaan.<br />
          Your order has been placed and will be shipped soon.
        </p>
        <div className="bg-card-bg rounded-xl border border-border p-6 text-left mb-6">
          <h3 className="font-semibold mb-3">Order Details</h3>
          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between text-sm py-1.5">
              <span className="text-muted">{item.product_name} × {item.quantity}</span>
              <span className="font-medium">₹{item.product_price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-3 border-border" />
          <div className="flex justify-between font-bold text-primary">
            <span>Total Paid</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>
        <button
          onClick={() => window.location.href = "/"}
          className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setOrderPlaced(true);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Review & Pay</h1>
      <p className="text-muted text-sm mb-8">Confirm your order details before payment</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address Card */}
        <div className="bg-card-bg rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base">Shipping Address</h2>
            <button
              onClick={() => router.push("/shipping")}
              className="text-primary text-sm font-medium hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div className="text-sm space-y-1.5 text-muted">
            <p className="text-foreground font-medium">{shippingInfo.fullName}</p>
            <p>{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} — {shippingInfo.pinCode}</p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-card-bg rounded-xl border border-border p-6">
          <h2 className="font-semibold text-base mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span className="text-muted truncate mr-3">
                  {item.product_name} × {item.quantity}
                </span>
                <span className="font-medium flex-shrink-0">₹{item.product_price * item.quantity}</span>
              </div>
            ))}
            <hr className="border-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span>₹{shippingFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <hr className="border-border" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          onClick={() => router.push("/shipping")}
          className="px-6 py-3 rounded-xl border border-border text-muted hover:bg-gray-50 transition-colors font-medium text-sm cursor-pointer"
        >
          ← Back to Shipping
        </button>
        <button
          onClick={handlePay}
          disabled={processing}
          className="px-10 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {processing ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pay Securely — ₹{grandTotal}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

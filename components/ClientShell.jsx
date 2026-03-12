"use client";

import { CheckoutProvider } from "@/context/CheckoutContext";

export default function ClientShell({ children, initialCart }) {
  return (
    <CheckoutProvider initialCart={initialCart}>
      {children}
    </CheckoutProvider>
  );
}

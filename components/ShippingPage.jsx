"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

const validators = {
  fullName: (v) => (v.trim() ? "" : "Full name is required"),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  phone: (v) => (/^\d{10}$/.test(v) ? "" : "Phone must be exactly 10 digits"),
  pinCode: (v) => (/^\d{6}$/.test(v) ? "" : "PIN code must be 6 digits"),
  city: (v) => (v.trim() ? "" : "City is required"),
  state: (v) => (v.trim() ? "" : "State is required"),
};

const fields = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", half: false },
  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", half: true },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210", half: true },
  { name: "pinCode", label: "PIN Code", type: "text", placeholder: "560001", half: true },
  { name: "city", label: "City", type: "text", placeholder: "Bangalore", half: true },
  { name: "state", label: "State", type: "text", placeholder: "Karnataka", half: false },
];

export default function ShippingPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { setShippingInfo } = useCheckout();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;
    for (const key of Object.keys(validators)) {
      const err = validators[key](form[key]);
      if (err) hasError = true;
      newErrors[key] = err;
    }
    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(validators).map((k) => [k, true])));

    if (!hasError) {
      setShippingInfo(form);
      router.push("/payment");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Shipping Address</h1>
      <p className="text-muted text-sm mb-8">Where should we deliver your order?</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-card-bg rounded-xl border border-border p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.half ? "" : "sm:col-span-2"}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  {field.label} <span className="text-red-400">*</span>
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors
                    ${
                      errors[field.name] && touched[field.name]
                        ? "border-error bg-red-50"
                        : "border-border bg-white"
                    }`}
                />
                {errors[field.name] && touched[field.name] && (
                  <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl border border-border text-muted hover:bg-gray-50 transition-colors font-medium text-sm cursor-pointer"
          >
            ← Back to Cart
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 cursor-pointer"
          >
            Continue to Payment →
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";

const steps = [
  { label: "Cart", path: "/" },
  { label: "Shipping", path: "/shipping" },
  { label: "Payment", path: "/payment" },
];

export default function StepIndicator() {
  const pathname = usePathname();

  const currentIndex = steps.findIndex((s) => s.path === pathname);

  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step.label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isCurrent
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors ${
                  isCurrent || isCompleted ? "text-primary" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                  i < currentIndex ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

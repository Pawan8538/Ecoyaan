import "./globals.css";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import ClientShell from "@/components/ClientShell";
import { cartData } from "@/data/cart";

export const metadata = {
  title: "Ecoyaan — Checkout",
  description:
    "Eco-friendly checkout flow. Shop sustainable products with Ecoyaan.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientShell initialCart={cartData}>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
            <StepIndicator />
            {children}
          </main>
        </ClientShell>
      </body>
    </html>
  );
}

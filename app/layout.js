import "./globals.css";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import ClientShell from "@/components/ClientShell";

export const metadata = {
  title: "Ecoyaan — Checkout",
  description:
    "Eco-friendly checkout flow. Shop sustainable products with Ecoyaan.",
};

async function getCartData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
    return res.json();
  } catch {
    return null;
  }
}

export default async function RootLayout({ children }) {
  const cartData = await getCartData();

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

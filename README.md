# Ecoyaan Checkout Flow

A simplified checkout flow built with **Next.js (App Router)**, **Tailwind CSS v4**, and **React Context API** — demonstrating SSR, form validation, and responsive design.

**Live Demo:** _[Deploy to Vercel after pushing to GitHub]_

---

## Architecture

```
app/
├── api/cart/route.js       # Mock API returning cart JSON
├── layout.js               # Root layout — fetches cart SSR, wraps in Context
├── page.js                 # Cart / Order Summary (SSR)
├── shipping/page.js        # Shipping Address form
├── payment/page.js         # Review, Pay, & Success
└── globals.css             # Design tokens + Tailwind config
components/
├── CartPage.jsx            # Product cards, quantity controls, summary
├── ShippingPage.jsx        # Address form with validation
├── PaymentPage.jsx         # Order review + simulated payment
├── StepIndicator.jsx       # 3-step progress bar
├── Navbar.jsx              # Header with branding
└── ClientShell.jsx         # Client wrapper for Context provider
context/
└── CheckoutContext.js      # Shared state: cart, shipping, order
```

### Key Decisions

| Decision | Rationale |
|---|---|
| **App Router + Server Components** | `layout.js` fetches cart data server-side via the API route, demonstrating SSR best practices |
| **React Context API** | Lightweight state shared across 3 screens — no external library needed for this scale |
| **Tailwind CSS v4** | Utility-first styling with custom design tokens via `@theme` for brand colors |
| **Client/Server split** | Layout is a Server Component that fetches data; pages use `"use client"` for interactivity |

### Form Validation

- All 6 fields required
- Email: regex format check
- Phone: exactly 10 digits
- PIN Code: exactly 6 digits
- Real-time validation on blur + full validation on submit

---

## Run Locally

```bash
git clone <repo-url>
cd ecoyaan
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy

```bash
# Push to GitHub, then:
npx vercel --prod
# Or connect the repo to Vercel dashboard for auto-deploys
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- JavaScript (no TypeScript)

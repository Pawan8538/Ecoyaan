import { NextResponse } from "next/server";
import { cartData } from "@/data/cart";

export async function GET() {
  return NextResponse.json(cartData);
}

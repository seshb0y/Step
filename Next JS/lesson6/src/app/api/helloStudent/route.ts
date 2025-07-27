import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  return NextResponse.json({ message: `Hello, ${name}!` });
}

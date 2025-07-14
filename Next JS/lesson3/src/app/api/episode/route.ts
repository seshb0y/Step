import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await res.json();
  return NextResponse.json(data);
}

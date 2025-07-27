
export async function GET() {
  return Response.json({ message: "Hello, students!" });
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    return Response.json({ message: `Hello, ${name}!` });
  }
  
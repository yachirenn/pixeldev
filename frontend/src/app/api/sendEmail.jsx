export async function POST(req) {
  const { name, email, message } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
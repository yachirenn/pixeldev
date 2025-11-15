export async function POST(req) {
  try {
    const { email, message } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message }),
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menghubungi server backend.' }), {
      status: 500,
    });
  }
}
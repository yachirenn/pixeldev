export async function sendEmail({ name, email, message }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    throw new Error('Gagal menghubungi server backend');
  }

  return res.json();
}
interface EmailData {
  name: string;
  email: string;
  message: string;
}


export async function sendEmail({ name, email, message }: EmailData) {
  const url = `${process.env.MONGODB_URI}/send`;
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
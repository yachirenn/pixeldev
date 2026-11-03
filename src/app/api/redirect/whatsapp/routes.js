export async function GET() {
  const phone = '6281234567890';
  const message = encodeURIComponent('Halo, saya tertarik dengan layanan Anda!');
  return Response.redirect(`https://wa.me/${phone}?text=${message}`, 302);
}
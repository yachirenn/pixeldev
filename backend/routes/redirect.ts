import express from 'express';
const router = express.Router();

import type { Request, Response } from 'express';

router.get('/gform', (req: Request, res: Response) => {
  res.redirect('https://docs.google.com/forms/d/your-form-id');
});

router.get('/whatsapp', (req: Request, res: Response) => {
  const phone = '6281234567890';
  const message = encodeURIComponent('Halo, saya tertarik dengan layanan Anda!');
  res.redirect(`https://wa.me/${phone}?text=${message}`);
});

module.exports = router;
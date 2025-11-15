import express from 'express';
import { sendEmail } from '../controller/emailController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Request masuk ke /send:', req.body);
});

export default router;
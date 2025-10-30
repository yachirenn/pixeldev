import express from 'express';
import User from '../models/user.ts';

const router = express.Router();

// GET semua user
router.get('/', (req, res) => {
  res.send('User route aktif!');
});

// POST tambah user
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
  }
});

export default router;
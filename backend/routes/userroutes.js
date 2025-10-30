import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// GET semua user
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST tambah user
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import emailRoutes from './routes/email.js';
import userRoutes from './routes/userroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // ✅ kasih default

app.use(cors({
  origin: '*' // ✅ sementara izinkan semua origin biar gampang tes
}));
app.use(express.json());

// Routes
app.use('/send', emailRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend PixelDev jalan 🎉');
});

app.get('/ping', (req, res) => {
  console.log("✅ Ping diterima");
  res.status(200).send('pong');
});

// ✅ Start server dulu, lalu connect MongoDB
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);

  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
    })
    .catch((err) => {
      console.error('❌ MongoDB error:', err);
    });
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import emailRoutes from './routes/email.js';
import userRoutes from './routes/userroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'https://pixeldev-eosin.vercel.app' // ganti sesuai domain Vercel kamu
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
  res.status(200).send('pong');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err);
  });
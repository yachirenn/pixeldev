import dotenv from 'dotenv';
import express, { type Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userroutes.ts';

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// route test
app.get('/', (req, res) => {
  res.send('Backend PixelDev jalan 🎉');
});

// koneksi MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('❌ MONGO_URI is not defined in environment variables');
}

mongoose.connect(mongoUri, {})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
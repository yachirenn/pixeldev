import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userroutes.js';

dotenv.config();
const app = express();

app.use('/api/users', userRoutes);
app.use(cors());
app.use(express.json());

// route test
app.get('/', (req, res) => {
  res.send('Backend PixelDev jalan 🎉');
});

// koneksi MongoDB
mongoose.connect(process.env.MONGO_URI, {
})

.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
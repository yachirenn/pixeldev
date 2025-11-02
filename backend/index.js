import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './routes/email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routing untuk form email
app.use('/send', emailRoutes);

// Aktifkan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
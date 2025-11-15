import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './routes/email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/send', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
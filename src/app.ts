import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

// Rutas de productos (CRUD)
app.use('/api/products', productRoutes);
app.use('/api/usuarios', userRoutes);

export default app;

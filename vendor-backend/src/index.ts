import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vendor_db')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
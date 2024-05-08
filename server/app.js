import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow requests from frontend
  credentials: true, // Allow cookies to be sent back and forth
}));
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Error handling middleware
import errorMiddleware from './middlewares/error.middleware.js';
app.use(errorMiddleware);

export default app;

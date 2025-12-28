import express from 'express';
import cors from 'cors';
import migrationRoutes from './routes/migration.routes.js';

const app = express();

// CORS Configuration - Allow all origins
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AI Migration API is running',
    endpoints: {
      migrate: 'POST /api/migrate',
      history: 'GET /api/migrate/history'
    }
  });
});

// API Routes
app.use('/api/migrate', migrationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(500).json({ 
    success: false, 
    message: isDev ? err.message : 'Internal server error' 
  });
});

export default app;

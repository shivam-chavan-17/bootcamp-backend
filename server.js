// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const corsOptions = {
  // origin: ['https://bootcamp-web.onrender.com', 'http://localhost:3000'], // Add frontend URL
  origin: ['http://localhost:3000'], // Add frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());  // Body parser middleware

// Simple Route to test API
app.get('/', (req, res) => {
  console.log('ok...')
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

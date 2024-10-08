// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');

const corsOptions = {
  origin: ['https://bootcamp-web.onrender.com', 'https://localhost:3000'], // Add frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// app.use(cors(corsOptions));


dotenv.config();
connectDB();

const app = express();
app.use(express.json());  // Body parser middleware

// Simple Route to test API
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);

// const cors = require('cors');
// app.use(cors({
//     origin: 'https://bootcamp-web.onrender.com', // Allow only your frontend
// }));
app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');

const app = express();

// ✅ 1. CORS CONFIG (FIXED)
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ 2. Middlewares
app.use(express.json());

// ✅ 3. Health Check
app.get('/', (req, res) => {
  res.send("API Running...");
});

// ✅ 4. Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/donors', require('./routes/donorRoutes'));
app.use('/api/v1/blood', require('./routes/bloodRoutes'));
app.use('/api/v1/requests', require('./routes/requestRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

// ❗ (later)
// app.use(errorMiddleware);

module.exports = app;
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ 1. Global Middlewares (ALWAYS FIRST)
app.use(cors());
app.use(express.json());

// ✅ 2. Health Check (optional but good)
app.get('/', (req, res) => {
  res.send("API Running...");
});

// ✅ 3. Routes (AFTER middlewares)
app.use('/api/v1/auth', require('./routes/authRoutes'));

app.use('/api/v1/donors', require('./routes/donorRoutes'));

app.use('/api/v1/blood', require('./routes/bloodRoutes'));

app.use('/api/v1/requests', require('./routes/requestRoutes'));

app.use('/api/v1/admin', require('./routes/adminRoutes'));

// ❗ (Later)
// app.use(errorMiddleware);

module.exports = app;
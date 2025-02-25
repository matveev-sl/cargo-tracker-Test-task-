const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const cargoRoutes = require('./routes/cargoRoutes');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// Подключаемся к MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json()); // Для парсинга тела запросов в JSON

// Используем маршруты для грузов
app.use('/api/cargos', cargoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

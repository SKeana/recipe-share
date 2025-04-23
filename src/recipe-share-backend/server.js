const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipe');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend origin
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/recipe-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/recipe', recipeRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Recipe API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api', authRoutes);
app.use('/api', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api/weather', weatherRoutes); 

module.exports = app;

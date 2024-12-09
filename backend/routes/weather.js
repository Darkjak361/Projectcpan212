const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/weather', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiKey = '23775be95e449acb0e0e00b40bc08063';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;

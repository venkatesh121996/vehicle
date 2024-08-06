const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const vehicleData = require('./data/vehicle-data.json');

app.get('/api/vehicle-location', (req, res) => {
  res.json(vehicleData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

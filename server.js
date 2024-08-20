const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Handle POST requests to the root path
app.post('/data', (req, res) => {
  const data = JSON.stringify(req.body, null, 2); // Format the JSON data for readability

  // Define the path to the text file
  const filePath = path.join(__dirname, 'response.txt');

  // Write the JSON data to the text file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Error writing to file');
    }

    console.log('Response saved to', filePath);
    res.send('POST request received and response saved');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
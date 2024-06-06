const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '90mb' })); 
app.use(bodyParser.urlencoded({ limit: '90mb', extended: true }));

// Routes
const webbanners = require('./webbanners'); // Adjust the path if necessary
app.use('/api/banners', webbanners);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

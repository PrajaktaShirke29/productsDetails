const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongoose');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());
app.use('/products', productRoutes);
app.use('/', authRoutes);

mongodb.connect('mongodb://localhost:27017/products', { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongodb !!!!");
    // connect.close();
  }).catch((err) => {
    console.log(err);
  });
app.listen(3100);

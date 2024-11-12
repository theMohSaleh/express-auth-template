require('dotenv').config();
require('./config/database');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Middleware

app.use(express.json());

app.use(morgan("dev"))

// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
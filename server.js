require('dotenv').config();
const express = require('express');
require('./config/database');
const app = express();
const morgan = require('morgan');


app.use(express.json());

app.use(morgan("dev"))

// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
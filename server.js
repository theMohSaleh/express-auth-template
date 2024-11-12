require('dotenv').config();
require('./config/database');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersController = require('./controllers/users')

// Middleware
app.use(express.json());

app.use(morgan("dev"))

// Public Routes
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersController);

// Protected Routes

app.listen(3000, () => {
  console.log('The express app is ready!');
});
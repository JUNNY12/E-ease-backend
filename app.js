//app js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const {limiter} = require('./middleware/limiter');
const {errorHandler} = require('./middleware/errorHandler');
const {logger} = require('./middleware/logEvents');

const corsOptions = require('./config/cors.options.config');
const connectDB = require('./config/db.config');
const verifyJWT = require('./middleware/verify.jwt');

connectDB();

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(credentials);
app.use(cors(corsOptions));

app.use('/register', require('./routes/register'), limiter);
app.use('/auth', require('./routes/auth'), limiter);
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/resetPassword', require('./routes/resetPassword'));
app.use('/requestPasswordReset', require('./routes/requestPasswordReset'));

app.use('/products', require('./routes/api/products'));
app.use('/reviews', require('./routes/api/reviews'));
app.use('/upload', require('./routes/api/upload'));

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/carts', require('./routes/api/cart'));
app.use('/shippingAddress', require('./routes/api/shippingAddress'));

app.use(errorHandler);

module.exports = app;
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const {limiter} = require('./middleware/limiter');
const corsOptions = require('./config/cors.options.config');
const connectDB = require('./config/db.config');
const verifyJWT = require('./middleware/verify.jwt');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(credentials);
app.use(cors(corsOptions));

app.use('/register', require('./routes/register'), limiter);
app.use('/auth', require('./routes/auth'), limiter);
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use('/products', require('./routes/api/products'));
app.use('/reviews', require('./routes/api/reviews'));

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/carts', require('./routes/api/cart'));



module.exports = app;
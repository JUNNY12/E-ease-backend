const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 3500;
const backend_url = process.env.BACKEND_URL;

mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use(express.static('public'))

app.get('/status', (req, res) => {
    res.json({
        connected:mongoose.connection.readyState === 1,
        date: new Date().toLocaleString()
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.use('/', createProxyMiddleware({ target: backend_url, changeOrigin: true }));
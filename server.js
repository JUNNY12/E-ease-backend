const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3500;

mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

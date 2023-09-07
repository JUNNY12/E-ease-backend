const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name: String,
    email:String,
    rating: Number,
    comment: String,
},
{timestamps: true}
);

module.exports = mongoose.model('Review', ReviewSchema);
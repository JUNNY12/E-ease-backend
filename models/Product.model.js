const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    slug: String,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    quantity: Number,
    image: {
        type: String,
        required: true
    },
    category: String,
    averageRating: {
        type: Number,
        default: 0
    },
    yearOfRelease: Number,
    publisher: String,
    pageNumber: Number,
    author: {
        authorName: String,
        aboutAuthor: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

},
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
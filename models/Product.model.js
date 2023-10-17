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
        url:String,
        public_id:String,
        secure_url:String,
        asset_id:String,
    },
    category: String,
    averageRating: {
        type: Number,
        default: 0
    },
    yearOfRelease: Number,
    publisher: String,
    pageNumber: Number,
    language:String,
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
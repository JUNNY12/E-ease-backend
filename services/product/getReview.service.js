const Product = require('../../models/Product.model');

const getProductReviews = async (productId) => {
    const product = await Product.findById(productId).populate('reviews');

    if(!product) {
        return {
            error: 'Product not found'
        }
    }

    return {
        reviews: product.reviews
    }
};

module.exports = {getProductReviews};
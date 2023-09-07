const Review = require('../../models/Review.model');
const Product = require('../../models/Product.model');

const createReview = async ({ name, email, rating, comment, productId }) => {
    const review = await Review.create({
        name,
        email,
        rating,
        comment,
    });

    const product = await Product.findById({ _id: productId });

    if (!product) {
        return {
            error: 'Product not found',
        };
    }

    product.reviews.push(review);

    // Calculate the total ratings
    const reviews = await Review.find({ _id: { $in: product.reviews } });
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);

    // Calculate the average rating (rounded to the nearest whole number)
    const calculateAverageRating = Math.round(totalRatings / reviews.length);

    product.averageRating = calculateAverageRating;

    await product.save();

    return {
        review,
    };
};

module.exports = { createReview };

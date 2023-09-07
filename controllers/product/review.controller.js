const { createReview } = require('../../services/product/createReview.service');
const { getProductReviews } = require('../../services/product/getReview.service');

const createReviewController = async (req, res) => {
    const { name, email, rating, comment, productId } = req.body;
    const { error, review } = await createReview({ name, email, rating, comment, productId });

    if (error) {
        return res.status(400).json({ error });
    }

    return res.status(201).json({ review });
};

const getReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await getProductReviews(productId);

        if (reviews.error) {
            return res.status(404).json({ error: reviews.error });
        }

        res.json(reviews);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching reviews' });
    }
};



module.exports = { createReviewController, getReviews};
const express = require('express');
const router = express.Router();
const {createReviewController, getReviews} = require ('../../controllers/product/review.controller');

router.route('/')
.post(createReviewController);

router.route('/:productId')
.get(getReviews);

module.exports = router;

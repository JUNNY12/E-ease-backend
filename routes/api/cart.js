const express = require('express');
const router = express.Router();
const { fetchCart, addProductToCart, deleteItemFromCart, updateUserCart, deleteSingleItemFromCart } = require('../../controllers/cart/cart.controller');

router.route('/delete/:userId')
    .post(deleteItemFromCart);

router.route('/deleteSingleItem/:userId')
    .post(deleteSingleItemFromCart);

router.route('/:userId')
    .get(fetchCart)
    .post(addProductToCart)
    .put(updateUserCart)
    
router.route('/delete/:userId')
    .post(deleteItemFromCart);


module.exports = router;
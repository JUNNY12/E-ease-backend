const express = require('express'); 
const router = express.Router();
const {fetchCart, addProductToCart, deleteItemFromCart, updateUserCart} = require('../../controllers/cart/cart.controller');

router.route('/:userId')
    .get(fetchCart)
    .post(addProductToCart)
    .put(updateUserCart)
    .delete(deleteItemFromCart);


module.exports = router;
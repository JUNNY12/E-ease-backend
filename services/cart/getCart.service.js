const Cart = require('../../models/Cart.model');

const getCart = async (userId) => {
    const cart = await Cart.findOne({userId: userId}).populate('items.productId');

    if(!cart) {
        return {
            error: 'Cart not found'
        }
    }

    return {
        cart: cart
    }
};

module.exports = {getCart};
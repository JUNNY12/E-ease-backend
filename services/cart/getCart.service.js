const Cart = require('../../models/Cart.model');

const getCart = async (userId) => {
    const cart = await Cart.findOne({userId}).populate({
        path:'items.productId',
        select: 'title price image category'
    });

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
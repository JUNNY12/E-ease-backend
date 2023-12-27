const Cart = require('../../models/Cart.model');

const  deleteSingleItem = async (userId, itemId) => {
    try {
        const cart = await Cart.findOne({
            userId
        });

        if (!cart) {
            return {
                error: 'Cart not found',
            };
        }

        const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));

        if (itemIndex === -1) {
            throw new Error('Item not found in the cart');
        }

        cart.items.splice(itemIndex, 1)
        cart.subTotal = calculateSubTotal(cart.items)
        await cart.save();

        function calculateSubTotal(items) {
            return items.reduce((total, item) => total + item.total, 0);
        }

        return {
            cart
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while updating the cart',
        };
    }
}

module.exports = {
    deleteSingleItem
};
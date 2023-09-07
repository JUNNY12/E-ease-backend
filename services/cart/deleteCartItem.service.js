const Cart = require('../../models/Cart.model');

const removeFromCart = async (userId, itemId) => {
    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return {
                error: 'Cart not found',
            };
        }

        const item = cart.items.find((item) => item._id == itemId);

        if (!item) {
            return {
                error: 'Item not found',
            };
        }

        if (item.quantity === 1) {
            cart.subTotal -= item.total;
            cart.items = cart.items.filter((item) => item._id != itemId);
        } else {
            // Reduce the quantity by 1 if quantity is greater than 1
            item.quantity -= 1;
            item.total = item.quantity * item.price;
            cart.subTotal -= item.price;
        }

        await cart.save();

        return {
            cart,
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while updating the cart',
        };
    }
};

module.exports = { removeFromCart };

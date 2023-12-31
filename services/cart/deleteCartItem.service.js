const Cart = require('../../models/Cart.model');
const Product = require('../../models/Product.model')

const removeFromCart = async (userId, itemId) => {
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

        if (cart.items[itemIndex].quantity === 1) {
            cart.items.splice(itemIndex, 1)
        }
        else {
            cart.items[itemIndex].quantity = cart.items[itemIndex].quantity - 1
            const productID = cart.items[itemIndex].productId
            const product = await Product.findOne({_id: productID})
            cart.items[itemIndex].total = cart.items[itemIndex].quantity * product.price
        }
        
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
};

module.exports = {
    removeFromCart
};
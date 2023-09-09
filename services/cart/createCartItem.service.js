const Cart = require('../../models/Cart.model');
const User = require('../../models/User.model');
const Product = require('../../models/Product.model');

const addToCart = async (userId, productId, quantity) => {
    
    try {
        const user = await User.findById(userId).exec();
        if(!user) return {error: 'User not found'};

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                subTotal: 0,
            });
        }

        const product = await Product.findById(productId).exec();

        if (!product) {
            return {
                error: 'Product not found',
            };
        }

        const price = product.price;

        const newItem = {
            productId,
            quantity,
            total: quantity * price,
        };

        const existingItemIndex = cart.items.findIndex((item) => item.productId == productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].total += quantity * price;
        } else {
            cart.items.push(newItem);
        }

        cart.subTotal += quantity * price;

        await cart.save();

        return {
            cart,
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while adding the item to the cart',
        };
    }
};

module.exports = { addToCart };

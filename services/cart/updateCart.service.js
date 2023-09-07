const Cart = require("../../models/Cart.model");
const User = require("../../models/User.model");

const updateCart = async (userId, cartData) => {
    
    try {
        const user = await User.findById(userId).exec();

        if (!user) {
            return {
                error: "User not found",
            };
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                subTotal: 0,
            });
        }

        if(cart.items && cart.items.length > 0) {
            cart.items.forEach((item) => {
                if (cartData.items.findIndex((cartItem) => cartItem.productId == item.productId) === -1) {
                    cartData.items.push(item);
                }
            });
        }

        cart.items = [...cartData.items];

        // Calculate the new subTotal
        cart.subTotal = cart.items.reduce((total, item) => {
            return total + item.price;
        }, 0);

        await cart.save();

        return {
            cart,
        };
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return {
                error: "Validation error: " + error.message,
            };
        }

        return {
            error: "An error occurred while updating the cart",
        };
    }
}

module.exports = { updateCart };

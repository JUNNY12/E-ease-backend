const ShippingAddress = require('../../models/ShippingAddress.model');
const User = require('../../models/User.model');

const createShippingAddress = async (userId, email, phoneNumber, firstName, lastName, street, Apartment, city, state, zip) => {
    try {
        const user = await User.findById(userId).exec();

        if (!user) return {
            error: 'User not found'
        };

        const requiredFields = [email, phoneNumber, firstName, lastName, street, city, state, zip];

        if (requiredFields.every(field => field)) {
            const shippingAddress = new ShippingAddress({
                email,
                phoneNumber,
                firstName,
                lastName,
                street,
                Apartment,
                city,
                state,
                zip,
                user: userId
            });

            await shippingAddress.save();

            user.shippingAddress = shippingAddress._id;

            await user.save();

            return {
                shippingAddress
            };
        } else {
            return {
                error: 'All fields are required'
            };
        }
    } catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while creating the shipping address'
        };
    }
}

module.exports = {
    createShippingAddress
};

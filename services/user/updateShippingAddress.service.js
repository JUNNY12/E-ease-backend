const ShippingAddress = require('../../models/ShippingAddress.model')

const updateShippingAddress = async (addressId, newData) => {
    try {
        const foundAddress = await ShippingAddress.findByIdAndUpdate(addressId,
            newData,
            { new: true }).exec();

        if (!foundAddress) {
            return {
                error: 'Shipping address not found'
            }
        }
        return {
            shippingAddress: foundAddress
        }
    }
    catch (error) {
        console.error(error);
        return {
            error: 'An error occurred while updating the shipping address'
        }
    }
}

module.exports = { updateShippingAddress};
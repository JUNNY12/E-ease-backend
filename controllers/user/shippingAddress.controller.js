const { createShippingAddress } = require('../../services/user/createShippingAddress.service');
const { updateShippingAddress } = require('../../services/user/updateShippingAddress.service');
const createShippingAddressController = async (req, res) => {
    const { userId, email, phoneNumber, firstName, lastName, street, Apartment, city, state, zip } = req.body;
    const { shippingAddress, error } = await createShippingAddress(userId, email, phoneNumber, firstName, lastName, street, Apartment, city, state, zip);

    if (error) {
        return res.status(400).json({ error });
    }

    return res.status(200).json({ shippingAddress });
}

const updateShippingAddressController = async (req, res) => {
    const {addressId, newData} = req.body;

    try {
        const { shippingAddress, error } = await updateShippingAddress(addressId, newData);

        if(error) res.status(200).json({error})
        return res.status(200).json({
            shippingAddress
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }

}

module.exports = { createShippingAddressController, updateShippingAddressController};
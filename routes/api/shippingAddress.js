const express = require('express');
const router = express.Router();

const {createShippingAddressController, updateShippingAddressController} = require('../../controllers/user/shippingAddress.controller');

router.route('/')
.post(createShippingAddressController)
.patch(updateShippingAddressController)

module.exports = router;
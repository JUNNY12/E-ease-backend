const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingAddressSchema = new Schema({
    email: String,
    phoneNumber: String,
    firstName: String,
    lastName: String,
    street: String,
    Apartment: String,
    city: String,
    state: String,
    zip: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }

);

module.exports = mongoose.model('ShippingAddress', ShippingAddressSchema);
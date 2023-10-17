const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: parseInt(process.env.USER_ROLE_ID),
        },
        Admin: Number,
        SuperAdmin: Number
    },
    email: String,
    phoneNumber: String,
    firstName: String,
    lastName: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    signedIn:{
        type: Date,
    },
    refreshToken: String,
},
    {
        timestamps: true
    }
);

module.exports = moongoose.model('User', UserSchema);
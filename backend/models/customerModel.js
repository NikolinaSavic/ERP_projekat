const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
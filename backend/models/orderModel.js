const mongoose = require("mongoose");
const Customer = require("./customerModel");
const Product = require("./productModel");

const orderSchema = mongoose.Schema({
    totalPrice: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    status: {
        type: String,
        default: "Not delivered"
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
    },
    deliveryDate: {
        type: Date,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Customer,
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
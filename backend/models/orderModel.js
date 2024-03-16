const mongoose = require("mongoose");
const Customer = require("./customerModel");
const Employee = require("./employeeModel");
const OrderItem = require("./orderItemModel");

const orderSchema = mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
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
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Employee,
    },
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: OrderItem
        }
    ]
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
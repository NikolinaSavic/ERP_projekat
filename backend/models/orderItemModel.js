const mongoose = require("mongoose");
const Product = require("./productModel");

const orderItemSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;
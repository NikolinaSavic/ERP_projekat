const mongoose = require("mongoose")
const Customer = require("./customerModel")
const Product = require("./productModel")

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    customer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Customer,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
    }
})


const Review = mongoose.model("Review", reviewSchema)
module.exports = Review
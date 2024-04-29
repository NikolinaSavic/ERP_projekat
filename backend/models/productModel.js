const mongoose = require("mongoose")
const Category = require("./categoryModel")

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [
        {
            url: { type: String }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    reviewsNumber: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
    },
    /*sales: {
        type: Number,
        default: 0
    },*/
    quantity: {
        type: Number,
        required: true
    }
});

productSchema.index({ productName: "text", description: "text" }, { name: "TextIndex" })  //ovo koristimo jer cemo pretrazivati proizvode po imenu

const Product = mongoose.model("Product", productSchema)

module.exports = Product
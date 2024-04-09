const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "Category description",
    }
})


const Category = mongoose.model("Category", categorySchema)
module.exports = Category
//za konekciju sa bazom da bismo upisali podatke
const connectDB = require("../config/db")

connectDB()

const productData = require("./products")
const Product = require("../models/productModel")

const customerData = require("./customers")
const Customer = require("../models/customerModel")

const orderData = require("./orders")
const Order = require("../models/orderModel")

const categoryData = require("./categories")
const Category = require("../models/categoryModel")

const reviewData = require("./reviews")
const Review = require("../models/reviewModel")

const importData = async () => {
    try {
        await Category.collection.deleteMany({})
        await Product.collection.deleteMany({})
        await Customer.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await Order.collection.deleteMany({})

        await Category.insertMany(categoryData)
        await Product.insertMany(productData)
        await Customer.insertMany(customerData)
        await Review.insertMany(reviewData)
        await Order.insertMany(orderData)

        console.log("Seeder data proceeded successfylly")
    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}

importData()
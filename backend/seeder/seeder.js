//za konekciju sa bazom da bismo upisali podatke
const connectDB = require("../config/db")

connectDB()

const productData = require("./products")
const Product = require("../models/productModel")

const customerData = require("./customers")
const Customer = require("../models/customerModel")

const employeeData = require("./employees")
const Employee = require("../models/employeeModel")

const orderData = require("./orders")
const Order = require("../models/orderModel")

const orderItemData = require("./orderItems")
const OrderItem = require("../models/orderItemModel")

const importData = async () => {
    try {
        await Product.collection.deleteMany({})
        await Customer.collection.deleteMany({})
        await Employee.collection.deleteMany({})
        await Order.collection.deleteMany({})
        await OrderItem.collection.deleteMany({})

        await Product.insertMany(productData)
        await Customer.insertMany(customerData)
        await Employee.insertMany(employeeData)

        //ovo radimo jer hocemo da povezemo order i order item
        const orderItems = await OrderItem.insertMany(orderItemData)
        const sampleOrders = orderData.map((order) => {
            orderItems.map((orderItem) => {
                order.orderItems.push(orderItem._id)
            })
            return { ...order } //vracamo order na koju je dodat order item
        })
        await Order.insertMany(sampleOrders)

        console.log("Seeder data proceeded successfylly")
    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}

importData()
const OrderItem = require("../models/orderItemModel")
const Product = require("../models/productModel")

const getOrderItems = async (req, res, next) => {
    try {
        const orderItems = await OrderItem.find({}).orFail();
        return res.status(200).json(orderItems)
    } catch (error) {
        next(error)
    }
}

const getOrderItemById = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).send("Order item not found!");
        } else {
            return res.status(200).json(orderItem)
        }
    } catch (error) {
        next(error)
    }
}

const createOrderItem = async (req, res, next) => {
    try {
        const { price, quantity, count, productName } = req.body;
        var product = await Product.findOne({ productName: productName }).select('_id')
        const createdOrderItem = await OrderItem.create({
            price: price,
            quantity: quantity,
            count: count,
            productId: product._id
        })
        return res.status(201).send(createdOrderItem)
    } catch (error) {
        next(error)
    }
}

const updateOrderItem = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).send("Order item doesn't exist!")
        } else {
            const { price, quantity, count, productName } = req.body;
            if (productName) {
                var product = await Product.findOne({ productName: productName }).select('_id');
            }

            orderItem.price = price || orderItem.price;
            orderItem.quantity = quantity || orderItem.quantity;
            orderItem.count = count || orderItem.count;
            orderItem.productId = product._id || orderItem.productId;

            await orderItem.save();
            return res.status(200).send("Order item successfully updated!")
        }
    } catch (error) {
        next(error)
    }
}

const deleteOrderItem = async (req, res, next) => {
    try {
        const orderItem = await OrderItem.findById(req.params.id);
        if (!orderItem) {
            return res.status(404).send("Order item not found");
        } else {
            await orderItem.remove();
            return res.status(200).send("Order item successfully deleted!");
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { getOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem }
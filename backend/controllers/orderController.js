const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ObjectId = require("mongodb").ObjectId;

const getCustomerOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customerId: ObjectId(req.customer._id) })
        if (!orders) {
            return res.status(400).send("This customer doesn't have any orders yet!");
        } else {
            return res.status(200).send(orders)
        }
    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("customerId", "-password -isAdmin -_id -__v").orFail();
        if (!order) {
            return res.status(404).send("Order ID not found!")
        } else {
            return res.status(200).send(order)
        }
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const { totalPrice, quantity, paymentMethod, orderItems } = req.body;
        if (!(totalPrice && quantity && paymentMethod && orderItems)) {
            return res.status(400).send("All inputs are required!");
        } else {
            for (let i = 0; i < orderItems.length; i++) {
                id = orderItems[i].productId
                const product = await Product.findById(id).select("quantity");
                //console.log(orderItems[i].quantity + "->")
                console.log(product.quantity + "-->")
                if (orderItems[i].quantity > product.quantity) {
                    return res.status(400).send("Number of items is not available now.")
                } else if (product.quantity - orderItems[i].quantity < 0) {
                    return res.status(400).send("Product out of stock!")
                }
                product.quantity = product.quantity - orderItems[i].quantity
                await product.save();
            }

            const order = await Order.create({
                totalPrice: totalPrice,
                quantity: quantity,
                paymentMethod: paymentMethod,
                orderItems: orderItems,
                customerId: ObjectId(req.customer._id)
            })

            return res.status(201).send(order)
        }
    } catch (error) {
        next(error)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send("Order not found!")
        } else {
            order.isPaid = true;
            console.log(order.isPaid)
            order.orderDate = Date.now()
            await order.save()
            return res.status(200).send("Order successfully updated to paid!")
        }
    } catch (error) {
        next(error)
    }
}

//admin
const getOrdersAdmin = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("customerId", "firstName lastName").sort({ orderDate: "desc" });
        return res.status(200).send(orders)
    } catch (error) {
        next(error)
    }
}

const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send("Order not found!")
        } else {
            order.status = "Delivered";
            order.deliveryDate = Date.now();
            await order.save()
            return res.status(200).send("Order successfully updated to delivered!")
        }
    } catch (error) {
        next(error)
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send("Order not found!")
        } else {
            await order.remove()
            return res.status(200).send("Order successfully deleted!")
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { getCustomerOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, deleteOrder, getOrdersAdmin }
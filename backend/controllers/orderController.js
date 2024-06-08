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
        console.log(req.body)
        const { orderItems, paymentMethod } = req.body;
        if (!orderItems || !paymentMethod) {
            return res.status(400).send("Payment method and order items are neccessery fields.");
        }
        else {
            console.log(orderItems.length)
            for (let i = 0; i < orderItems.length; i++) {
                id = orderItems[i].productId
                const product = await Product.findById(id).select("quantity");
                if (orderItems[i].quantity > product.quantity) {
                    return res.status(400).send("It's not possible to create order with that number of items");
                }
            }
            const order = await Order.create({
                orderItems: orderItems,
                customerId: ObjectId(req.customer._id),
                paymentMethod: paymentMethod
            })

            // Smanjivanje kolicine proizvoda
            for (let i = 0; i < orderItems.length; i++) {
                const productId = orderItems[i].productId;
                const product = await Product.findById(productId);

                product.quantity -= orderItems[i].quantity;
                await product.save();
            }

            return res.status(201).send(order);
        }

    } catch (err) {
        next(err)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            console.log("Order not found");
            return res.status(404).send("Order not found!");
        } else {
            order.isPaid = true;
            order.orderDate = Date.now();
            await order.save();
            console.log("Order updated to paid:", order);
            return res.status(200).send("Order successfully updated to paid!");
        }
    } catch (error) {
        console.error("Error updating order to paid:", error);
        next(error);
    }
};


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

const updateOrderPrice = async (req, res, next, id, amount) => {
    try {
        console.log("ID", id)
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).send("Order not found")
        } else {
            order.totalPrice = order.totalPrice + amount;
            await order.save();
        }
    } catch (err) {
        next(err);
    }

}


module.exports = { getCustomerOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, deleteOrder, getOrdersAdmin, updateOrderPrice }
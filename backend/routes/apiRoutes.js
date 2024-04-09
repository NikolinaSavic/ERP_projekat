const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const customerRoutes = require("./customerRoutes")
const orderItemRoutes = require("./orderItemRoutes")
const orderRoutes = require("./orderRoutes")

app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/customers", customerRoutes)
app.use("/orderItems", orderItemRoutes)
app.use("/orders", orderRoutes)



module.exports = app
const express = require("express")
const app = express()
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const customerRoutes = require("./customerRoutes")
const orderRoutes = require("./orderRoutes")
const reviewRoutes = require("./reviewRoutes")

app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/customers", customerRoutes)
app.use("/orders", orderRoutes)
app.use("/reviews", reviewRoutes)



module.exports = app
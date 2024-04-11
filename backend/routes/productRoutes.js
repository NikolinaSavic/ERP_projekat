const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/productController')

//obican customer
router.get("/", getProducts)
router.get("/:id", getProductById)
router.get("/category/:categoryId", getProductsByCategory)

//admin
router.post("/admin", createProduct)
router.put("/admin/:id", updateProduct)
router.delete("/admin/:productName", deleteProduct)

module.exports = router
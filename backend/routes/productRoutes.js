const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/productController')

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:productName", deleteProduct)
router.get("/category/:categoryId", getProductsByCategory)

module.exports = router
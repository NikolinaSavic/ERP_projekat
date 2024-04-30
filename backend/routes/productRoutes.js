const express = require('express')
const router = express.Router()
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, getProductsByAdmin, getProductBySearchBox, adminUpload } = require('../controllers/productController')
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

//obican customer
router.get("/", getProducts)
router.get("/:id", getProductById)
router.get("/category/:categoryId", getProductsByCategory)
router.get("/search/:searchQuery", getProductBySearchBox)

//admin
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/admin/pr", getProductsByAdmin)
router.post("/admin", createProduct)
router.put("/admin/:id", updateProduct)
router.delete("/admin/:productName", deleteProduct)
router.post("/admin/upload", adminUpload)

module.exports = router
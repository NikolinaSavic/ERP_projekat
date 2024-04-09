const express = require('express')
const router = express.Router()
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')

router.get("/", getCategories)
router.get("/:id", getCategoryById)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:category", deleteCategory)

module.exports = router
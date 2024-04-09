const Category = require("../models/categoryModel")

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ categoryName: "asc" }).orFail()
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send("Category not found")
        }
        else {
            return res.status(200).json(category)
        }
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        const { categoryName, description } = req.body;
        if (!categoryName) {
            return res.status(400).send("Category name is required!")
        }
        const categoryExists = await Category.findOne({ categoryName: categoryName })
        if (categoryExists) {
            return res.status(409).json({ message: "Category already exists!" })
        } else {
            const categoryCreated = await Category.create({
                categoryName: categoryName,
                description: description
            })
            return res.status(201).send(categoryCreated)
        }
    } catch (error) {
        next(error)
    }
}



const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send("Category doesn't exist")
        } else {
            const { categoryName, description } = req.body;
            category.categoryName = categoryName || category.categoryName;
            category.description = description || category.description;

            await category.save();
            return res.status(200).send("Category successsfully updated!")
        }
    } catch (error) {
        next(error);
    }
}


const deleteCategory = async (req, res, next) => {
    try {
        if (req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                categoryName: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove()
            res.json({ categoryDeleted: true })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
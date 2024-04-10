const Product = require("../models/productModel")
const Category = require("../models/categoryModel")

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).orFail();
        return res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}


const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found!");
        } else {
            return res.status(200).json(product);
        }
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { productName, description, size, price, categoryName } = req.body;
        if (!productName || !description || !size || !price || !categoryName) {
            return res.status(400).send("All fields are mandatory!")
        }

        var category = Category.findOne({ categoryName: categoryName }).select('_id');
        const existingProduct = await Product.findOne({ productName: productName })
        if (existingProduct) {
            return res.status(409).send("Product already exists")
        } else {
            const createdProduct = await Product.create({
                productName: productName,
                description: description,
                size: size,
                price: price,
                categoryId: category._id
            })
            return res.status(201).send(createdProduct);
        }
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product doesn't exist!");
        } else {
            const { productName, description, size, price, categoryName } = req.body;

            if (categoryName) {
                var category = await Category.findOne({ categoryName: categoryName }).select('_id');
            }

            product.productName = productName || product.productName;
            product.description = description || product.description;
            product.size = size || product.size;
            product.price = price || product.price;
            product.categoryId = category._id || product.categoryId;
            await product.save();
            return res.status(200).send("Product successfully updated!")
        }
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        if (req.params.productName !== "Choose product") {
            const productExists = await Product.findOne({
                productName: decodeURIComponent(req.params.productName)
            }).orFail()
            await productExists.remove()
            res.json({ productDeleted: true })
        }
    } catch (error) {
        next(error)
    }
}

const getProductsByCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await Product.find({ categoryId: categoryId });
        if (products.length === 0) {
            return res.status(404).send("There are no products for this category!");
        } else {
            return res.status(200).json(products);
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory }
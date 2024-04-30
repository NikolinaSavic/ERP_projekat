const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const recordsPerPage = require("../config/pagination")
const imageValidate = require("../utils/imageValidation")
const { query } = require("express")


const getProducts = async (req, res, next) => {
    try {
        const pageNum = Number(req.query.pageNum) || 1
        const totalProducts = await Product.countDocuments({})

        let sort = {}
        const sortOption = req.query.sort || ""
        if (sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
        }

        const products = await Product.find({})
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage);
        return res.status(200).json(products)

    } catch (error) {
        next(error)
    }
}

const getProductBySearchBox = async (req, res, next) => {
    try {

        const searchQuery = req.params.searchQuery || "";
        let searchQueryCondition = {}
        let query = {}
        if (searchQuery) {
            queryCondition = true
            searchQueryCondition = { $text: { $search: '"' + searchQuery + '"' } }
        }

        if (queryCondition) {
            query = {
                $and: [
                    searchQueryCondition
                ]
            }
        }

        const products = await Product.find(query);
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

//moze samo admin
const createProduct = async (req, res, next) => {
    try {
        const { productName, description, size, price, categoryName, quantity } = req.body;
        if (!productName || !description || !size || !price || !categoryName || !quantity) {
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
                categoryId: category._id,
                quantity: quantity
            })
            return res.status(201).send(createdProduct);
        }
    } catch (error) {
        next(error)
    }
}

//admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product doesn't exist!");
        } else {
            const { productName, description, size, price, categoryName, quantity } = req.body;

            if (categoryName) {
                var category = await Category.findOne({ categoryName: categoryName }).select('_id');
            }

            product.productName = productName || product.productName;
            product.description = description || product.description;
            product.size = size || product.size;
            product.price = price || product.price;
            product.quantity = quantity || product.quantity;
            product.categoryId = category._id || product.categoryId;
            await product.save();
            return res.status(200).send("Product successfully updated!")
        }
    } catch (error) {
        next(error)
    }
}

//admin
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
    //const categoryId = req.params.categoryId;

    try {
        const pageNum = Number(req.query.pageNum) || 1;
        const categoryName = req.params.category;
        const products = await Product.find({})
            .skip(pageNum > 1 ? ((pageNum - 1) * recordsPerPage) : 0)
            .limit(recordsPerPage)
            .populate({ path: "categoryId", select: "categoryName" });
        if (products.length === 0) {
            return res.status(404).send("There are no products for this category!");
        } else {
            return res.status(200).json(products);
        }
    } catch (error) {
        next(error)
    }
}

//admin
const getProductsByAdmin = async (req, res, next) => {
    try {
        const products = await Product.find({});//.sort({ productName: "asc" })
        return res.status(200).json(products)
    } catch (err) {
        next(err);
    }
}

const adminUpload = async (req, res, next) => {
    try {
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send("No files were uploaded.")
        }

        const validateResult = imageValidate(req.files.images)
        if (validateResult.error) {
            return res.status(400).send(validateResult.error)
        }

        const path = require("path")
        const { v4: uuidv4 } = require("uuid") //random name za fajlove

        let imagesToUpload = []
        if (Array.isArray(req.files.images)) {
            imagesToUpload = req.files.images
        } else {
            imagesToUpload.push(req.files.images)
        }

        for (let image of imagesToUpload) {
            console.log(path.extname(image.name))
        }

    } catch (error) {
        next(error)
    }
}



module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, getProductsByAdmin, getProductBySearchBox, adminUpload }
const Review = require("../models/reviewModel")
const Product = require("../models/productModel")

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({}).orFail();
        return res.status(200).json(reviews)
    } catch (error) {
        next(error)
    }
}

const getReviewById = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Review not found!");
        } else {
            return res.status(200).json(review);
        }
    } catch (error) {
        next(error)
    }
}

const createReview = async (req, res, next) => {
    try {
        const { rating, description } = req.body;
        if (!rating || !description) {
            return res.status(400).send("Rating and description are mandatory fields!");
        }
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).send("Product for which the review is intended does not exist!")
        } else {
            const alreadyReviewed = await Review.findOne({ "customer._id": req.customer._id, productId: req.params.id })
            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Already left a review for this product! The product can be rated only once!' })
            } else {
                //console.log(req.customer._id)
                await Review.create([
                    {
                        rating: Number(rating),
                        description: description,
                        customer: { id: req.customer._id, name: req.customer.firstName + " " + req.customer.lastName },
                        productId: req.params.id
                    }
                ])
                return res.status(201).send("Review successfully created!")
            }
        }
    } catch (error) {
        next(error)
    }
}

const updateReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Review not found!")
        } else {
            const { rating, description } = req.body;

            if (req.customer._id == review.customer.id) {
                review.rating = rating || review.rating;
                review.description = description || review.description;

                await review.save();
                return res.status(200).send("Review successfully updated!")
            } else {
                return res.status(400).send("You don't have permission to update the review!")
            }
        }
    } catch (err) {
        next(err);
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
        if (!review) {
            return res.status(404).send("Review not found!")
        }
        else {
            await review.remove()
            return res.status(200).send("Review successfully deleted!")
        }
    }
    catch (error) {
        next(error)
    }
}


module.exports = { getReviews, getReviewById, createReview, updateReview, deleteReview }
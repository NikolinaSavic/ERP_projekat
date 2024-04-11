const express = require('express')
const router = express.Router()
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/reviewController')

//obican user
router.post("/product/:id", createReview)
router.put("/:id", updateReview)

//admin
router.get("/", getReviews)
router.get("/:id", getReviewById)
router.delete("/:id", deleteReview)

module.exports = router
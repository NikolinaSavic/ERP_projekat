const express = require('express')
const router = express.Router()
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/reviewController')
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

//obican user
router.use(verifyIsLoggedIn)
router.post("/product/:id", createReview)
router.put("/:id", updateReview)

//admin
router.use(verifyIsAdmin)
router.get("/", getReviews)
router.get("/:id", getReviewById)
router.delete("/:id", deleteReview)

module.exports = router
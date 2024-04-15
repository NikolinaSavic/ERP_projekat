const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")
const { getCustomerOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, deleteOrder, getOrdersAdmin } = require('../controllers/orderController')


//obican korisnik
router.use(verifyIsLoggedIn)
router.get("/", getCustomerOrders)
router.get("/customer/:id", getOrder)
router.post("/", createOrder)
router.put("/paid/:id", updateOrderToPaid)

//admin 
router.use(verifyIsAdmin)
router.get("/all", getOrdersAdmin)
router.put("/delivered/:id", updateOrderToDelivered)
router.delete("/:id", deleteOrder)

module.exports = router
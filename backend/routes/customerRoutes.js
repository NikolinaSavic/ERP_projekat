const express = require('express')
const router = express.Router()
const { getCustomers, getCustomerById, registerCustomer, loginCustomer } = require('../controllers/customerController')

//obican korisnik
router.post("/register", registerCustomer)
router.post("/login", loginCustomer)


//admin
router.get("/", getCustomers)
router.get("/:id", getCustomerById)


module.exports = router
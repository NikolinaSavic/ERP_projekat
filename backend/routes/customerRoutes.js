const express = require('express')
const router = express.Router()
const { getCustomers, getCustomerById, registerCustomer, loginCustomer, updateCustomerProfile, getCustomerProfile, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


//obican korisnik
router.post("/register", registerCustomer)
router.post("/login", loginCustomer)

//logovani korisnik
router.use(verifyIsLoggedIn)
router.put("/profile", updateCustomerProfile)
router.get("/profile/:id", getCustomerProfile)

//admin
router.use(verifyIsAdmin)
router.get("/", getCustomers)
router.get("/:id", getCustomerById)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)


module.exports = router
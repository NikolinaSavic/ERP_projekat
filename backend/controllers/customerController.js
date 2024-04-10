const Customer = require("../models/customerModel")

const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({}).orFail();
        res.json(customers)
    } catch (error) {
        next(error)
    }
}


const getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send("Customer not found!");
        } else {
            return res.status(200).json(customer)
        }
    } catch (error) {
        next(error)
    }
}


/*const createCustomer = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}*/

//OVO NA KRAJU RADITI - jer ce zahtevati posebnu logiku ako je admin ili obican user


module.exports = { getCustomers, getCustomerById }
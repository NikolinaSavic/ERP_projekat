const Customer = require("../models/customerModel")
const { hashPassword, comparePasswords } = require("../utils/hashPassword")
const generateAuthToken = require("../utils/generateAuthToken")

const getCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({}).select("-password"); //ne zelim da se prikaze lozinka korisnika
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

const registerCustomer = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone, address } = req.body;
        if (!firstName || !lastName || !email || !password || !phone || !address) {
            return res.status(400).send("All fields are required!")
        }

        const customerExists = await Customer.findOne({ email })
        if (customerExists) {
            res.status(400).send("Customer already exists");
        } else {
            const hashedPassword = hashPassword(password)
            const customer = await Customer.create({
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
                phone: phone,
                address: address
            })
            //ovo sad radimo da bismo sakrili passw novokreiranog korisnika
            //res.status(201).send(customer)
            res
                .cookie("access_token", generateAuthToken(customer._id, customer.firstName, customer.lastName, customer.email, customer.isAdmin), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                }) //koristimo kako bi korisnik nakon registracije automatski bio logovan na app
                .status(201).json({
                    success: "Customer created", customerCreated: {
                        _id: customer._id,
                        firstName: customer.firstName, lastName: customer.lastName, email: customer.email,
                        phone: customer.phone, address: customer.address, isAdmin: customer.isAdmin
                    }
                })
        }

    } catch (error) {
        next(error)
    }
}


const loginCustomer = async (req, res, next) => {
    try {
        const { email, password, doNotLogout } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All fields are required")
        }

        const customer = await Customer.findOne({ email })
        //proveravamo jednakost unete lozinke sa onom hesovanom iz baze p
        if (customer && comparePasswords(password, customer.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }

            if (doNotLogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }
                //1000 = 1ms; znaci 7d ce biti logovan taj isti korisnik koji je zatvorio app a cekirao da ostane logovan
            }

            return res.cookie(
                "access_token",
                generateAuthToken(
                    customer._id,
                    customer.firstName,
                    customer.lastName,
                    customer.email,
                    customer.isAdmin
                ),
                cookieParams
            ).json({
                success: "Customer is logged in",
                customerLoggedIn: { _id: customer._id, firstName: customer.firstName, lastName: customer.lastName, email: customer.email, isAdmin: customer.isAdmin, doNotLogout }
            })
        } else {
            return res.status(401).send("Wrong credentials")
        }
    } catch (error) {
        next(error)
    }
}




module.exports = { getCustomers, getCustomerById, registerCustomer, loginCustomer }
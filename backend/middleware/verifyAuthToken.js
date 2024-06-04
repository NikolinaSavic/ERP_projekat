const jwt = require("jsonwebtoken")

const verifyIsLoggedIn = (req, res, next) => {
    //next()
    //return //to do: remove later
    try {
        const token = req.cookies.access_token; //citamo token iz cookia
        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.customer = decoded
            next()
        } catch (err) {
            return res.status(401).send("Unauthorized. Invalid token!")
        }
    } catch (error) {
        next(error)
    }
}

const verifyIsAdmin = (req, res, next) => {
    //next()
    //return //to do: remove later
    if (req.customer && req.customer.isAdmin) {
        next()
    } else {
        return res.status(401).send("Unauthorized. Admin required!")
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin }
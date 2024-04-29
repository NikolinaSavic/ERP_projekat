const bcrypt = require("bcryptjs")

const customers = [
    {
        firstName: "Nikolina",
        lastName: "Savic",
        email: "nina2@gmail.com",
        password: bcrypt.hashSync("test", 10),
        address: "Novi Sad",
        phone: "0669421164",
        isAdmin: true,
    }, {
        firstName: "Mila",
        lastName: "Jovic",
        email: "mila@gmail.com",
        password: bcrypt.hashSync("mila123", 10),
        address: "Novi Beograd",
        phone: "318-849-0247",
        isAdmin: false,
    }, {
        firstName: "Tara",
        lastName: "Rosic",
        email: "tara@gmail.com",
        password: bcrypt.hashSync("tara123", 10),
        address: "Zrenjanin",
        phone: "504-491-7745",
        isAdmin: false,
    }, {
        firstName: "Luka",
        lastName: "Micic",
        email: "luka@gmail.com",
        password: bcrypt.hashSync("luka123", 10),
        address: "Kikinda",
        phone: "0212931",
        isAdmin: false,
    }, {
        firstName: "Milica",
        lastName: "Pijetlovic",
        email: "milica@gmail.com",
        password: bcrypt.hashSync("milica123", 10),
        address: "Beograd",
        phone: "387-729-9389",
        isAdmin: false,
    }
]

module.exports = customers
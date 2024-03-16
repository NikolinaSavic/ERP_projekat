const ObjectId = require("mongodb").ObjectId;

const orderItems = [
    {
        price: 51,
        quantity: 4,
        count: 2,
        productId: ObjectId("65f4aa27eca009cd57d8c234")
    }, {
        price: 54,
        quantity: 2,
        count: 2,
        productId: ObjectId("65f4aa27eca009cd57d8c235")
    }, {
        price: 31,
        quantity: 2,
        count: 4,
        productId: ObjectId("65f4aa27eca009cd57d8c236")
    }, {
        price: 55,
        quantity: 2,
        count: 2,
        productId: ObjectId("65f4aa27eca009cd57d8c237")
    }, {
        price: 17,
        quantity: 3,
        count: 3,
        productId: ObjectId("65f4aa27eca009cd57d8c238")
    }
]

module.exports = orderItems
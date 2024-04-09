const ObjectId = require("mongodb").ObjectId;

const reviews = [
    {
        rating: 5,
        description: "Description",
        customer: { id: ObjectId('6615368316656a4c2107100e'), name: "Nikolina Savic" },
        productId: ObjectId('6615389fe7160224eca24344'),
    },
    {
        rating: 3,
        description: "Description",
        customer: { id: ObjectId('6615368316656a4c2107100e'), name: "Nikolina Savic" },
        productId: ObjectId('6615389fe7160224eca24344'),
    },

]

module.exports = reviews
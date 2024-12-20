const ObjectId = require("mongodb").ObjectId;

const orders = [
  {
    totalPrice: 221,
    quantity: 4,
    status: "Delivered",
    isPaid: true,
    paymentMethod: "PayPal",
    orderDate: "2/13/2024",
    deliveryDate: "4/14/2023",
    customerId: ObjectId("662f9574edf4accd328d16c1"),
    orderItems: [],
  }, {
    totalPrice: 53,
    quantity: 1,
    status: "In process",
    isPaid: false,
    paymentMethod: "Credit card",
    orderDate: "8/28/2023",
    deliveryDate: "2/5/2024",
    customerId: ObjectId("662f9574edf4accd328d16c1"),
    orderItems: [],
  }, {
    totalPrice: 158,
    quantity: 3,
    status: "Delivered",
    isPaid: true,
    paymentMethod: "Cash on delivery",
    orderDate: "5/15/2023",
    deliveryDate: "9/1/2023",
    customerId: ObjectId("662f9574edf4accd328d16c2"),
    orderItems: [],
  }, {
    totalPrice: 110,
    quantity: 2,
    status: "Confirmed",
    isPaid: true,
    paymentMethod: "PayPal",
    orderDate: "8/22/2023",
    deliveryDate: "4/5/2023",
    customerId: ObjectId("662f9574edf4accd328d16c2"),
    orderItems: [],
  }, {
    totalPrice: 333,
    quantity: 4,
    status: "Confirmed",
    isPaid: false,
    paymentMethod: "Cash on delivery",
    orderDate: "8/21/2023",
    deliveryDate: "2/27/2024",
    customerId: ObjectId("662f9574edf4accd328d16c2"),
    orderItems: [],
  }
]

module.exports = orders
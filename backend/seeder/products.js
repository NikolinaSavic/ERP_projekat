const ObjectId = require("mongodb").ObjectId

const products = [
  {
    productName: "Fitness gym gloves",
    description: "Designed to shield your hands during intense workouts, these fitness gym gloves provide added grip and reduce friction, ensuring comfort and protection throughout your training sessions.",
    size: "one size",
    price: 20,
    images: [
      { path: "/glowes.jpg" }
    ],
    rating: 4,
    reviewsNumber: 1,
    categoryId: ObjectId("662f9574edf4accd328d16be"),
    quantity: 3
  }, {
    productName: "Waterproof fitness bag",
    description: "A durable fitness bag built to withstand the elements, keeping your gear dry and organized whether you're hitting the gym or braving the outdoors.",
    size: "one size",
    price: 120,
    images: [
      { path: "/bag.jpg" }
    ],
    rating: 2,
    reviewsNumber: 1,
    categoryId: ObjectId("662f9574edf4accd328d16be"),
    quantity: 5
  }, {
    productName: "Elastic bands for fitness",
    description: "Elastic bands for fitness offer versatile resistance training, targeting various muscle groups for effective workouts. Whether for stretching, strength training, or rehabilitation, they provide a portable and efficient fitness solution.",
    size: "one size",
    price: 30,
    images: [
      { path: "/bands.jpg" }
    ],
    rating: 5,
    reviewsNumber: 36,
    categoryId: ObjectId("662f9574edf4accd328d16bd"),
    quantity: 3
  }, {
    productName: "Gym ankle straps",
    description: "Gym ankle straps provide targeted resistance for lower body workouts, enhancing exercises like cable kickbacks and hip abductions. Designed for comfort and durability, they optimize your gym routine for stronger, more toned legs and glutes",
    size: "one size",
    price: 45,
    images: [
      { path: "/straps.jpg" }
    ],
    rating: 5,
    reviewsNumber: 2,
    categoryId: ObjectId("662f9574edf4accd328d16bd"),
    quantity: 7
  }, {
    productName: "Water bottle",
    description: "Stay hydrated on the go with our sports water bottle, the perfect companion for your active lifestyle. Made from durable and lightweight materials, this bottle is designed to withstand the rigors of your workouts and outdoor adventures.",
    size: "one size",
    price: 20,
    images: [
      { path: "/bottle.jpg" }
    ],
    rating: 3,
    reviewsNumber: 1,
    categoryId: ObjectId("662f9574edf4accd328d16be"),
    quantity: 10
  }
]

module.exports = products
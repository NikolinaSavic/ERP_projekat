const Stripe = require('stripe');
const { updateOrderToPaid, updateOrderPrice } = require('./orderController');
require("dotenv").config()
const stripe = Stripe(process.env.STRIPE_KEY)

const createCheckoutSession = async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
        },
    });
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.productName,
                    metadata: {
                        id: item._id,
                    },

                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "usd",
                    },
                    display_name: "Free shipping",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "usd",
                    },
                    display_name: "Next day air",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            },
        ],
        line_items,
        customer: customer.id,
        metadata: {
            order_id: req.body.order_id,
        },
        mode: 'payment',
        success_url: `http://localhost:3000/order-success/${req.body.order_id}`,
        cancel_url: req.body.fromOrderPage ? `http://localhost:3000/customer/order-details/${req.body.order_id}` : 'http://localhost:3000/shipping',
    })

    res.send({ url: session.url })

}

const webhook = async (req, res, next) => {

    let data;
    let eventType;

    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: process.env.STRIPE_WEBHOOK,
    });
    let event
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, process.env.STRIPE_WEBHOOK);
        console.log(`Webhook Verified`);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    data = event.data.object
    eventType = event.type

    if (eventType === 'checkout.session.completed') {
        console.log("Data", data)
        updateOrderToPaid(req, res, next, data.metadata.order_id)
        if (data.shipping_cost.amount_subtotal != 0) {
            const amount = data.shipping_cost.amount_subtotal / 100
            updateOrderPrice(req, res, next, data.metadata.order_id, amount)
        }
    }

    res.send().end()
}

module.exports = { createCheckoutSession, webhook }
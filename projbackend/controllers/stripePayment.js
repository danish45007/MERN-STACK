const stripe = require("stripe")("sk_test_v5N7yzVFH9rf2xpKQxsM0UgG008KRQBlkX")
const uuid = require("uuid/v4")


exports.makePayment = (req,res) => {
    const {products, token} = req.body
    console.log("PRODUCTS", products)


    let amount = 0
        products.map(p => {
            amount = amount + p.price
        });

        const idempotencyKey = uuid()
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stripe.charges.create({
                amount: amount*100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
            }, {idempotencyKey})
            .then(result => res.status(200).json(result))
            .catch(err => console.log(err))
        })
    

}
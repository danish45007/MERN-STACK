const moongose = require('mongoose');
const { ObjectId } = moongose.Schema

const ProductCartSchema = new moongose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,
});
const ProductCart = moongose.model("ProductCart",ProductCartSchema)

const orderSchema = new moongose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },

},
{timestamps:true});


const Order = moongose.model("Order",orderSchema)

module.exports = { Order ,ProductCart };


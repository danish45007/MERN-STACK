const {Order ,ProductCart} = require('../models/order');


// middleware get order by id


exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err,order) => {
        if(err) {
            return res.status(400).json({
                error: "Order Id not found"
            });
        }
        req.order = order;
        next();
    });
};


// Create Order
exports.createOrder = (req,res) => {
    req.body.order.user = rq.profile;
    const order = new Order(req.body.order)
    order.save((err,order) => {
        if(err) {
            return res.status(400).json({
                error: "Order not created in DB"
            });
        }
        res.json(order);
    });
};

// Get order's
exports.getAllOrders = (req,res) => {
    Order.find().populate("user", "_id name").exec((err,order) => {
        if(err) {
            return res.status(400).json({
                error: "No Order Found in DB"
            });
        }
        return res.json(order);
    });
};

// get status of order
exports.getStatus = (req,res) => {
    return res.json(Order.schema.path("status").enumValues)
};

// update status of order
exports.updateStatus = (req,res) => {
    Order.update(
        {_id: req.body.oderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).json({
                    error: "Connot Update order status"
                });
            }
            return res.json(order);
        }
    );
};
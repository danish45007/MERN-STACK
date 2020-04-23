const User = require("../models/user");
const Order = require("../models/order");
    
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if (err ||  ! user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user
        next();
    });
};                                                                                                                                                                                                                                                                                  

// Get User by Id
exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.ecrypt_password = undefined;
    return res.json(req.profile)
}

// Update User
exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile.id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err,user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorizd to update this user"
                });
            }
            user.salt = undefined;
            user.ecrypt_password = undefined;
            return res.json(user)
        }
    );
};

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err,order) => {
        if(err) {
            return res.status(400).json({
                error: "No order in this account"
            });
        }
        return res.json(order)
    });

};


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transcation_id: req.body.order.transcation_id
        });
    });

    // store this in Database
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases:purchases}},
        {new: true},
        (err,purchases) => {
            if(err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next();
        }
    )

    

}



// Show all users
// exports.GetAllUsers = (req,res) => {
//     User.find().exec((err,users) => {
//         if (err || ! users) {
//             return res.status(400).json({
//                 error: "NO users found in Db"
//             });
            
//         }
//         return res.json(users);
//     })
// }
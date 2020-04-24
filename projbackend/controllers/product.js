const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


// miidleware get product by Id
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });

};

// post method/ create product 
exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        // Destructure the field's
        const {name, description, price, category, stock} = fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all the fields"
            });


        } 


        let product = Product(fields)

        // handle file here
        if(file.photo) {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                });
            }
            // saving file to DB
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        // save to DB
        product.save((err,product) => {
            if(err) {
                return res.status(400).json({
                    error: "Saving tshirt in DB failed"
                })
            }
            return res.json(product);
        });





    });
};

// Get product

exports.getProduct = (req,res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

// middleware for loading image in the background

exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)

    }
    next();
};

// Delete product
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err,deletedproduct) => {
        if(err) {
            return res.status(400).json({
                error: "Unable to delete prodcut"
            });
        }
        res.json({
            message: "Successfully deleted",
            deletedproduct
        });
    });


};


// Update product
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
         
        // updated code
        let product = req.product;
        product = _.extend(product, fields)

        // handle file here
        if(file.photo) {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big"
                });
            }
            // saving file to DB
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }
        // save to DB
        product.save((err,product) => {
            if(err) {
                return res.status(400).json({
                    error: "Updation of tshirt in DB failed"
                })
            }
            return res.json(product);
        });





    });


};

// List of products
exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id" 
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: "No product found"
            })
        }
        return res.json(products);
    });
};


// Get all the unique categories
exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err) {
            return res.status(400).json({
                message: "No category found"
            });
        }
        return res.json(category);
    });
    
};




// Bulk Operations / Update stocks
exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.product.map(prod => {
        return {
            updateOne : {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}

            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err,products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
            
        }
        next();
        
    });
};


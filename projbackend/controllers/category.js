const Category = require("../models/category");


// middleware
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err,cate) => {
        if(err) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        req.Category = cate;
        next();
    });
};
// post

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) => {
        if(err) {
            return res.status(400).json({
                error: "Category not created in DB"
            });
        }
        return res.json(category);
        
    });
};

// get by id

exports.getCategory = (req,res) => {
    return res.json(req.category); 
};

// get all

exports.getAllCategory = (req,res) => {
    Category.find().exec((err,cate) => {
        if (err || !cate) {
            return res.status(400).json({
                error: "No category is present in DB"
            });
        }
        return res.json(cate);
    }); 
};

// update

exports.updateCategory = (req,res) => {
    // req.category able to grab coz of the middleware > getCategoryById
    const category = req.Category;
    // grabing category name from the frontend or the postman  
    category.name = req.body.name;
    
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update category in DB"
            });
        }
        return res.json(updatedCategory);
    });
};

// delete

exports.removeCategory = (req,res) => {
    const category = req.Category;
    category.remove((err, deletedcategory) => {
        if(err) {
            return res.status(400).json({
                error: "Unable to delete category"
            });
        }
        res.json({
            message: `Successfully deleted ${deletedcategory}`
        });
    });

};
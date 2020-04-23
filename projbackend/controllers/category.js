const Category = require("../models/category");



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

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) => {
        if(err) {
            return res.status(400).json({
                error: "Category not created in DB"
            });
        }
        return res.json({category});
        
    });
};

exports.getCategory = (req,res) => {
    return res.json(req.category); 
};





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
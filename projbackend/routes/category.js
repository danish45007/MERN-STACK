// Import's
const express = require('express');
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require('../controllers/category');
const {isAdmin, isAuthenticated, isSingedIn} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');


// params / miidleware
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

// post
router.post("/category/create/:userId",isSingedIn, isAuthenticated, isAdmin ,createCategory);

// read/get
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

// update/put   
router.put("/category/:categoryId/:userId",isSingedIn,isAuthenticated,isAdmin,updateCategory);

// delete 
router.delete("/category/:categoryId/:userId",isSingedIn,isAuthenticated,isAdmin,removeCategory);

// Exporting router
module.exports = router;




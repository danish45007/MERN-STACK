const express = require('express');
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory} = require('../controllers/category');
const {isAdmin, isAuthenticated, isSingedIn} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');


// params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

// actual routers goes here
router.put("/category/create/:userId",isSingedIn, isAuthenticated, isAdmin ,createCategory);


router.get("/category/:categoryId",getCategory);
router.get("/categorys",getAllCategory);



module.exports = router;
const express = require('express');
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, updateProduct, removeProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product');
const {isSingedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

// params
router.param("userId",getUserById);
router.param("productId",getProductById)

// all the route's
// post the photo
router.post("/product/create/:userId", isSingedIn, isAuthenticated, isAdmin, createProduct);

// get photo
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId", photo);

// update product
router.put("/product/:productId/:userId",isSingedIn, isAuthenticated, isAdmin, updateProduct);

// delete product
router.delete("/product/:productId/:userId",isSingedIn, isAuthenticated, isAdmin, removeProduct);

// list product
router.get("/products",getAllProducts);

// Getting all category's
router.get("/product/categories",getAllUniqueCategories);


module.exports = router;
const express = require('express');
const router = express.Router();

const {isSingedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

const {getUserById, pushOrderInPurchaseList} = require('../controllers/user');

const {getOrderById, createOrder, getAllOrders, getStatus, updateStatus} = require("../controllers/order")

const {updateStock} = require("../controllers/product")


router.param("userId",getUserById);
router.param("orderId",getOrderById);


// create order
// signedIn -> isAuthenticated -> pushOrderInPurchaseList -> updateStock -> createOrder

router.post("/order/create/:userId", isSingedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

// Read route to read all the order
router.get("/order/all/:userId", isSingedIn, isAuthenticated, isAdmin, getAllOrders);

// get status of order
router.get("/order/status/:userId",isSingedIn, isAuthenticated, isAdmin, getStatus)

// add the status of ordere
router.put("/order/:orderId/status/:userId",isSingedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router;
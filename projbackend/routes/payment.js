const express = require('express');
const router = express.Router();
const {isSingedIn, isAuthenticated} = require("../controllers/auth")
const {getToken,processPaymnet} = require("../controllers/paymentb")



router.get("/payment/gettoken/:userId", isAuthenticated, isSingedIn, getToken);

router.post("/payment/braintree/:userId", isSingedIn, isAuthenticated, processPaymnet);



module.exports = router;


// Import's
const express = require('express');
const router = express.Router();

const {getUserById, getUser, updateUser, userPurchaseList} = require("../controllers/user");
const {isAdmin, isSingedIn, isAuthenticated} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSingedIn, isAuthenticated, getUser);

// Update the User info
router.put("/user/:userId",isSingedIn,isAuthenticated,updateUser);

router.get("/orders/user/:userId",isSingedIn,isAuthenticated,userPurchaseList);


// router.get("/users",GetAllUsers);

module.exports = router;
const express = require('express');
const { signUpUser, logInUser, googleSingUp, forgetPassword, verifyOTP, resetPassword, addAddress, getAddress, updateAddress, deleteAddress, placeOrder, getOrders} = require('../controller/userController');
const router = express.Router();

router.post('/signUp' , signUpUser);
router.post('/login' , logInUser);
router.post('/googlesignUp' , googleSingUp);
router.post('/forgetpassword', forgetPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resetpassword", resetPassword);
router.post("/addaddress", addAddress);
router.get("/getaddress/:userId", getAddress);
router.post("/updateaddress", updateAddress);
router.post("/deleteaddress", deleteAddress);
router.post("/placeorder", placeOrder);
router.get("/getorders/:userId", getOrders);

module.exports = router;
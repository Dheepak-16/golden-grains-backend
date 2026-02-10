const express = require('express');
const { signUpUser, logInUser, googleSingUp, forgetPassword, verifyOTP, resetPassword} = require('../controller/userController');
const router = express.Router();

router.post('/signUp' , signUpUser);
router.post('/login' , logInUser);
router.post('/googlesignUp' , googleSingUp);
router.post('/forgetpassword', forgetPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resetpassword", resetPassword);

module.exports = router;
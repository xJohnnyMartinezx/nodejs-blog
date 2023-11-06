const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();


// ************************** USER ROUTES **********************************
// *************************************************************************

    // *********** RENDERING LOGIN FORM ************
    router.get("/login", authController.redernLoginForm);

    router.post("/login", authController.loginAuth);


// *************************** EXPORTS *************************************
// *************************************************************************
    // EXPORTTING THE ROUTER FOR USE IN app.js
    module.exports = router;
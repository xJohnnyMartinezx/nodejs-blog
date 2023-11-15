const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();
const authMiddleware = require("../Controllers/authController");
const blogController = require("../Controllers/blogController");



// ************************** USER ROUTES **********************************
// *************************************************************************

    router.get("/", userController.userIndex );

    // *********** CREATING A NEW USER (FORM) ************
    router.get("/create", userController.createUserForm);

    // ******* POST REQUEST ********
    router.post("/", userController.createUserReqest);

    // ***** FIND BY ID ********  
        // ARE THE VARIABLE PARTS OF THE ROUTE THAT MAY CHANGE EX: ID.
        // localhost:3000/blogs/:id (id CAN CHANGE)
        // NEED TO USE : TO DENOTE A ROUTE PARAMETER.
    router.get("/:id", authMiddleware.authorizedUser, userController.userProfile);



    
    
    
 



// *************************** EXPORTS *************************************
// *************************************************************************
    // EXPORTTING THE ROUTER FOR USE IN app.js
    module.exports = router;
    // test comment
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();


// ************************** USER ROUTES **********************************
// *************************************************************************

    router.get("/", userController.userIndex);

    // *********** CREATING A NEW BLOG ************
    router.get("/create", userController.createUserForm);

    // ******* POST REQUEST ********
    router.post("/", userController.createUserReqest);

    // ***** FIND BY ID ********  
        // ARE THE VARIABLE PARTS OF THE ROUTE THAT MAY CHANGE EX: ID.
        // localhost:3000/blogs/:id (id CAN CHANGE)
        // NEED TO USE : TO DENOTE A ROUTE PARAMETER.
    router.get("/:id", userController.userProfile);



// *************************** EXPORTS *************************************
// *************************************************************************
    // EXPORTTING THE ROUTER FOR USE IN app.js
    module.exports = router;
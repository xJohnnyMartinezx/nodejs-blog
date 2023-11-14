const express = require("express");

// IMPORTING THE BLOG CONTROLLER FUNCTIONS
const blogController = require("../Controllers/blogController");

const authMiddleware = require("../Controllers/authController")

// CREATING A NEW INSTANCE OF THE ROUTER OBJ. WHICH IS KIND OF AN EMULATION OF app.js
const router = express.Router();



        //************ ROUNTING AND HTML ************ */


// ************************** BLOG ROUTES **********************************
// *************************************************************************

    //****** ORDER IS IMPORTANT, VIEWS WILL NOT RENDER IF ORDER IS INCORRECT ********

    // ********** SHOW BLOG INDEX (ALL BLOG POSTS) *************
    //CALLING blogIndex FUNCTION AS SECOND PARAM, FROM blogController file.
    router.get("/", blogController.blogIndex);

    // *********** CREATING A NEW BLOG ************
    router.get("/create", authMiddleware.authorizedUser, blogController.createBlogForm);

    // ******* POST REQUEST ********
    router.post("/", blogController.createBlogPostReq);

    // ***** FIND BY ID ********  
        // ARE THE VARIABLE PARTS OF THE ROUTE THAT MAY CHANGE EX: ID.
        // localhost:3000/blogs/:id (id CAN CHANGE)
        // NEED TO USE : TO DENOTE A ROUTE PARAMETER.
    router.get("/:id", blogController.getBlogById);

    // ***** DELETE BY ID ********   
    router.delete("/:id", authMiddleware.authorizedUser, blogController.deleteById)





// *************************** EXPORTS *************************************
// *************************************************************************
    // EXPORTTING THE ROUTER FOR USE IN app.js
    module.exports = router;
const express = require("express");

    // IMPORTING OUR MODEL(S)
    const Blog = require("../models/blog");

// CREATING A NEW INSTANCE OF THE ROUTER OBJ. WHICH IS KIND OF AN EMULATION OF app.js
const router = express.Router();



        //************ ROUNTING AND HTML ************ */


// ************************** BLOG ROUTES **********************************
// *************************************************************************

router.get("/", (req, res) => {
            // CAN CHAIN ON METHODS TO FUTHER CUSTOMIZE/FILTER ITEMS.
            // EXAMPLE: .sort() METHOD. THE (-1) MEANS DECENDING ORDER, SO NEWEST BLOG WILL BE ON TOP OF PAGE.
                // Blog.find()
                Blog.find().sort({createdAt: -1})
                .then((result) => {
                    // console.log(result);
                    res.render("index", {title: "All Blogs", blogs: result})
                })
                .catch((error) => {
                    console.log(error);
                });
            });

     // ******* POST REQUEST ********
     router.post("/",(req, res) => {
                const blog = new Blog(req.body);

                blog.save()
                .then((result) => {
                    res.redirect("/blogs");
                })
                .catch((error) => {
                    console.log(error);
                })
            });

     // *********** CREATING A NEW BLOG ************
     
     router.get("/create", (req, res) => {
        res.render("create", {title : "Create"})
    })

    // ************ ROUTE PARAMETERS ************
          // ***** FIND BY ID ********  
            // ARE THE VARIABLE PARTS OF THE ROUTE THAT MAY CHANGE EX: ID.
            // localhost:3000/blogs/:id (id CAN CHANGE)
            // NEED TO USE : TO DENOTE A ROUTE PARAMETER.
            router.get("/:id", (req, res) => {
                    // NEED TO EXTRACT THE id BY USING THE req OBJ
                    const id = req.params.id; //.id IS WHATEVER THE PARA NAME IS. IN THIS CASE IT'S "id" FROM LINE 243.
                    //   console.log(id);
                    Blog.findById(id)
                    // THIS vvv result WILL BE THE SINGLE BLOG BASED ON THE CURRENT id.
                    .then((result) => {
                        // NEXT WE WANT TO RENDER THE deatails PAGE.
                                    // blog vvv IS JUST PROP NAME, CAN BE ANYTHING. 
                        res.render("details", {blog: result, title: "Blog Detail"})
                    })                                    // ^^^ THIS IS JUST THE PAGE TITLE.              
                    .catch((error) => {
                        console.log(error);
                    })

                })

          // ***** DELETE BY ID ********   
          
          router.delete("/:id", (req, res) => {
                    const id = req.params.id;
                    Blog.findByIdAndDelete(id)
                    .then((result) => {
                        // WHEN SENDING AN AJAX REQUEST, WE CANNOT USE res.redirect IN NODE AS A RESPONSE. 
                        // WE HAVE TO SEND JSON OR TEXT DATA BACK TO THE BROWSER.
                        // res.redirect("/blogs")  *** CANNOT DO THIS.
                        res.json({ redirect: "/blogs"})
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })

        // EXPORTTING THE ROUTER FOR USE IN app.js
        module.exports = router;
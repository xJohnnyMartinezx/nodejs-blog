// THIS CONTROLLER WILL CONTAIN ALL LOGIC FOR ANY REQUEST HAVING TO DO WITH BLOGS.

// IMPORT Blog MODEL.
const Blog = require("../models/blog");


// ************************* ROUTE FUNCTIONS ***************************
// *********************************************************************

// **************** GET ALL BLOGS **************************
const blogIndex = (req, res) => {

  // CAN CHAIN ON METHODS TO FUTHER CUSTOMIZE/FILTER ITEMS.
  // EXAMPLE: .sort() METHOD. THE (-1) MEANS DECENDING ORDER, SO NEWEST BLOG WILL BE ON TOP OF PAGE.
  // Blog.find()
    Blog.find().sort({createdAt: -1})
    .then((result) => {
     // console.log(result);
     res.render("blogs/index", {title: "All Blogs", blogs: result})
})
     .catch((error) => {
        console.log(error);
});
}

// **************** GET BY ID (INDIVIDUAL BLOG) *************

const getBlogById = (req, res) => {      
    const id = req.params.id; 
    Blog.findById(id)
    .then((result) => {
        // HAVE TO PROVIDE DIR PATH IN VIEWS DIR "blogs/details"
        res.render("blogs/details", {blog: result, title: "Blog Detail"});
        // console.log("getBlogById works");
    })                                               
    .catch((error) => {
        res.status(404).render("404", {title : "Blog not found."})
        console.log(error);
    })
}

// **************** CREATE BLOG FORM ************************

const createBlogForm = (req, res) => {
    res.render("blogs/create", {title : "Create"});
}

// **************** CREATE BLOG POST REQUEST ****************

const createBlogPostReq = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect("/blogs");
    })
    .catch((error) => {
        console.log(error);
    })
}

// **************** DELETE BY ID ****************************

const deleteById = (req, res) => {
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
}


// ************************* EXPORTS ***************************
// *************************************************************

// EXPORTING FUNCTIONS FOR USE IN App.js
    module.exports = {
        blogIndex,
        getBlogById,
        createBlogForm,
        createBlogPostReq,
        deleteById
    }

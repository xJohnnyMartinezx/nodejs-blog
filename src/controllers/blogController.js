// THIS CONTROLLER WILL CONTAIN ALL LOGIC FOR ANY REQUEST HAVING TO DO WITH BLOGS.

// IMPORT Blog MODEL.
const Blog = require("../Models/blog");
const User = require("../Models/user");
const auth = require("../Controllers/authController");
// const session = require("app.js");
const session = require("express-session");




// ************************* ROUTE FUNCTIONS ***************************
// *********************************************************************

// **************** GET ALL BLOGS **************************

const blogIndex = async (req, res) => {
    // CAN CHAIN ON METHODS TO FURTHER CUSTOMIZE/FILTER ITEMS.
    // EXAMPLE: .sort() METHOD. THE (-1) MEANS DESCENDING ORDER, SO NEWEST BLOG WILL BE ON TOP OF PAGE.
    try {
        const allBlogsResult = await Blog.find().sort({createdAt: -1})
        return await res.render("blogs/index", {title: "All Blogs", blogs: allBlogsResult})
    } catch (error){
        console.log(error);
    }
}

// **************** GET BY ID (INDIVIDUAL BLOG) *************

const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await  Blog.findById(id)
        return await res.render("blogs/details", {blog: result, title: "Blog Detail"});
    } catch (error) {
        res.status(404).render("404", {title : "Blog not found."})
        console.log(error);
    }
}

// **************** CREATE BLOG FORM ************************

const createBlogForm = (req, res) => {
    res.render("blogs/create", {title : "Create"});
}

// **************** CREATE BLOG POST REQUEST ****************

const createBlogPostReq = async (req, res) => {
    try {
    const blog = new Blog(req.body);
                            //vvv USING MIDDLEWARE GET THE LOGGED IN USER'S ID
    const userId = auth.currentUserId(req);
    const newBlog = await blog.save()       // vv THIS $push ADDS THE NEW BLOG ID TO blogIds ARR IN USER SCHEMA
        await User.findByIdAndUpdate(userId, {$push: {blogIds: newBlog._id}});
                                           // The $push operator appends specified items into an array without loading them first into memory.
        return res.redirect("/blogs");
    } catch (error){
        console.log(error)
    }
}


// **************** DELETE BY ID ****************************

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        const userId = auth.currentUserId(req);//vv $pull DELETES THE BLOG ID FROM blogIds ARR IN USER SCHEMA
        await User.findByIdAndUpdate(userId, {$pull: {blogIds: blog._id}});
        await Blog.findByIdAndDelete(id);
                // WHEN SENDING AN AJAX REQUEST, WE CANNOT USE res.redirect IN NODE AS A RESPONSE.
                // WE HAVE TO SEND JSON OR TEXT DATA BACK TO THE BROWSER.
                // res.redirect("/blogs")  *** CANNOT DO THIS.
        return res.json({redirect: "/blogs"});
    } catch (error) {
        console.log(error);
    }
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

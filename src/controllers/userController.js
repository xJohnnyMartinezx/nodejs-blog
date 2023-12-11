const User = require("../Models/user");
const Blog = require("../Models/blog");
const auth = require("../Controllers/authController");
const {all} = require("../Routes/blogRoutes");


// ************************* ROUTE FUNCTIONS ***************************
// *********************************************************************

// **************** GET ALL USERS **************************
const userIndex = async (req, res) => {
    try {
        const allUsersResult = await User.find().sort({createdAt: -1})
                //                                                 vvv BEING DIRECTLY REFERENCED IN INDEX HTML FOREACH
        return res.render("users/userIndex", {title: "All Users", users: allUsersResult})
    } catch(error) {
        console.log(error);
    }
}


// **************** DISPLAY BLOGS CREATED BY USER ON PROFILE PAGE (MIDDLEWARE)**************************

const getAllBlogsByUser = async (req, res) => {

    try {
        const id = req.params.id;
        let user = await User.findById(id);
        // RETRIEVING ARRAY OF BLOG IDS STORED IN USER MODEL.
        let userBlogIdsArr = user.blogIds;
        // console.log(userBlogIdsArr);
        // RETRIEVING ALL BLOG OBJECTS.
        let allBlogs = await Blog.find();
        // SETTING AN EMPTY ARRAY FOR MATCHING IDS
        let matchingIds = [];
        // LOOPING THROUGH ALL BLOG OBJECTS
        allBlogs.forEach((blog) => {
            // IF ANY BLOG OBJ IDs MATCH THE BLOG IDs IN THE USER MODEL,
            // THEN PUSH THE ENTIRE BLOG OBJ TO matchingIds ARRAY.
            if (userBlogIdsArr.includes(blog._id)) {
                matchingIds.push(blog);
            }
        })
        return matchingIds;
    } catch (error) {
        console.log(error);
    }
}


// **************** GO TO USER PROFILE **************************

// const userProfile = (req, res) => {
//
//     const id = req.params.id;
//     User.findById(id)
//         .then(async (result) => {
//             // USING getAllBlogsByUser FUNC TO POPULATE BLOGS WITH MATCHING IDs
//             let matchingIds = await getAllBlogsByUser(req);
//             // console.log(`line 60: ${matchingIds}`);
//             res.render("users/profile", {user: result, title: "User Profile", matchingBlogIds: matchingIds});
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

const userProfile = async (req, res) => {

    try {
        const id = req.params.id;
        const userById = await User.findById(id)
        let matchingIds = await getAllBlogsByUser(req);
        return res.render("users/profile", {user: userById, title: "User Profile", matchingBlogIds: matchingIds});
    } catch (error) {
        console.log(error);
    }
}


// **************** CREATE USER FORM ************************

const createUserForm = (req, res) => {
    res.render("users/createNewUser", {title: "Create User"});
}

// **************** CREATE USER (POST REQUEST) ****************

const createUserRequest = async (req, res) => {
    try {
        const user = new User(req.body);
        // CHECK IF USER ALREADY EXISTS
        //vvv THIS IS THE USER IMPUTED EMAIL
        const existingUser = await User.findOne({email: req.body.email});
        //  ^^ findOne() WILL LOOK THROUGH COLLECTION OF users AND RETURN THE FIRST MATCH.
        // IF STATEMENT BELOW IS CHECKING IF USER INPUTTED EMAIL MATCHES ANY FOUND BY findOne();
        if (existingUser) {
            res.send("User already exists, create a new user or try resetting your password.");
            console.log(`${existingUser} already exists!`);
        } else {
            console.log(`new user created`);
            user.save()
                .then((result) => {
                    res.redirect("/login");
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    } catch (error) {
        console.log(error);
        res.redirect("/create");
    }
}


// ************************* EXPORTS ***************************
// *************************************************************

// EXPORTING FUNCTIONS FOR USE IN App.js
module.exports = {
    userIndex,
    userProfile,
    createUserForm,
    createUserRequest,
}
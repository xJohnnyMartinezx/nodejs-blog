
const User = require("../Models/user");
// const userService = require("../Services/userService");


// ************************* ROUTE FUNCTIONS ***************************
// *********************************************************************

// **************** GET ALL USERS **************************
// const userIndex = (userService.userIndexService);
const userIndex = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then((result) => {
            //                                                 vvv BEING DIRECTLY REFERENCED IN INDEX HTML FOREACH
            res.render("users/userIndex", { title: "All Users", users: result })
        })
        .catch((error) => {
            console.log(error);
        });
}

// **************** GO TO USER PROFILE **************************

const userProfile = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((result) => {            // vvv BEING DIRECTLY REFERENCED IN PROFILE HTML
            res.render("users/profile", { user: result, title: "User Profile" });
            // console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
}

// **************** CREATE USER FORM ************************

const createUserForm = (req, res) => {
    res.render("users/createNewUser", { title: "Create User" });
}

// **************** CREATE USER POST REQUEST ****************

const createUserReqest = async (req, res) => {

    const user = new User(req.body);

    // CHECK IF USER ALREADY EXISTS
                                                         //vvv THIS IS THE USER IMPUTTED EMAIL
    const existingUser = await User.findOne({ email: req.body.email });
                                  //  ^^ findOne() WILL LOOK THORUGH COLLETION OF users AND RETURN THE FIRST MATCH.
    // IF STATMENT BELOW IS CHECKING IF USER INPUTTED EMAIL MATCHES ANY FOUND BY findOne();
    if (existingUser) {
        res.send("User already exists, create a new user or try resetting your password.");
        console.log(`${existingUser} already exists!`);
    } else {
        console.log(`new user created`);
        user.save()
            .then((result) => {
                res.redirect("/");
            })
            .catch((error) => {
                console.log(error);
            })
    }
}


// ************************* EXPORTS ***************************
// *************************************************************

// EXPORTING FUNCTIONS FOR USE IN App.js
module.exports = {
    userIndex,
    userProfile,
    createUserForm,
    createUserReqest
}
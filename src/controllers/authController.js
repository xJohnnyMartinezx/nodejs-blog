const User = require("../Models/user");
const loging = require("../Models/login");
const bcrypt = require("bcrypt");
const userController = require("../Controllers/userController.js");
const userRouter = require("../Routes/userRoutes");




// **************** LOGIN FORM ************************

const redernLoginForm = (req, res) => {
    res.render("auth/login", {title : "Login"});
}


// **************** LOGIN REQUEST ************************
const loginAuth = async (req, res) => {
    try {
        const checkIfUserExists = await User.findOne({ email: req.body.email });
        if(!checkIfUserExists){
            console.log("User does not exist.");
            res.redirect("/login");
        } else {

            // COMPARE HASHED PASSWORD
            const passwordCompare = await bcrypt.compare(req.body.password, checkIfUserExists.password)
            if(passwordCompare){
                console.log("Login Successful.");
                res.redirect("/blogs");
            } else {
                console.log("Wrong email or Password.");
                res.redirect("/login");
            }
        }
        
    } catch (error) {
        console.log(error);
    }
} 

// EXPORT FUNCTION
module.exports = {
    redernLoginForm,
    loginAuth
}
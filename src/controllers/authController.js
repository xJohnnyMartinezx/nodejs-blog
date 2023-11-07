const User = require("../Models/user");
const loging = require("../Models/login");
const bcrypt = require("bcrypt");
const userController = require("../Controllers/userController.js");
const userRouter = require("../Routes/userRoutes");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;




// **************** LOGIN FORM ************************

const redernLoginForm = (req, res) => {
    res.render("auth/login", {title : "Login"});
}


// **************** LOGIN REQUEST ************************
// const loginAuth = async (req, res) => {
//     try {
//         const checkIfUserExists = await User.findOne({ email: req.body.email });
//         if(!checkIfUserExists){
//             console.log("Invalid credientials.");
//             res.redirect("/login");
//         } else {

//             // COMPARE HASHED PASSWORD
//             const passwordCompare = await bcrypt.compare(req.body.password, checkIfUserExists.password)
//             if(passwordCompare){
//                 console.log(`Login Successful. ${checkIfUserExists._id}`);
//                 res.redirect(`users/${checkIfUserExists._id}`);
//             } else {
//                 console.log("Wrong email or Password.");
//                 res.redirect("/login");
//             }
//         }
        
//     } catch (error) {
//         console.log(error);
//     }
// } 

const loginAuth = async (req, res) => {
    try {
        const userInDb = await User.findOne({ email: req.body.email });
        if(!userInDb){
            console.log("Invalid credientials.");
            res.redirect("/login");
        } else {

            // COMPARE HASHED PASSWORD
            const passwordCompare = await bcrypt.compare(req.body.password, userInDb.password)
            if(!passwordCompare){
                console.log("Wrong email or Password.");
                res.redirect("/login");
            } else {
                // SAVING A TOKEN TO THE COOKIE
                const token = jwt.sign({userId: userInDb._id}, jwtSecret);
                res.cookie("token", token, {httpOnly: true});
                console.log("Login Successful.");
                res.redirect(`users/${userInDb._id}`);
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
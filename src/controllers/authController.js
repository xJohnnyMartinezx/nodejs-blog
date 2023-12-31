const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session")
const jwtSecret = process.env.JWT_SECRET;


// ****** AUTH MIDDLEWARE FUNCTION ***** TO VIEW AUTHORIZED WEBPAGES
// **** THIS MIDDLEWARE CAN BE EXPORTED AND ADDED TO PAGES THAT REQUIRE A USER TO BE LOGGED IN TO BE VIEWED *********

// **** FUNCTION TO SEE IF THE USER IS LOGGED IN *******

// const isLoggedIn = (req, res) => {
//     if (req.session){
//
//     }
// }

const authorizedUser = (req, res, next) => {
    // GETTING COOKIE FROM THE BROWSER
const token = req.cookies.token;
// CHECKING IF TOKEN EXISTS
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
        // CAN DO res.render AND RENDER A EJS PAGE
    } else {
        // IF TOKEN DOES EXIST, THEN DECODE IT AND COMPARE IT TO JWT_SECRET IN EVN FILE.
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            console.log(req.userId);
            next();
        } catch (error) {
            res.status(401).json({message: "Unauthorized"});
            console.log(error);
        }
    }
}

// ********* CUSTOM MIDDLEWARE TO RETRIEVE LOGGED IN USER'S ID ****************
const currentUserId = (req) => {
    let token = req.cookies.token;
    const decoded = jwt.verify(token, jwtSecret);
        const currLoggedinUserId  = decoded.userId;
        return currLoggedinUserId;
        // console.log(currLoggedinUserId.email);
}


// **************** LOGIN FORM ************************

const renderLoginForm = (req, res) => {
    res.render("auth/login", {title : "Login"});
}


// **************** LOGIN REQUEST ************************

const loginAuth = async (req, res) => {
    try {
        const userInDb = await User.findOne({ email: req.body.email });
        if(!userInDb){
            console.log(`line 70: ${userInDb}`);
            console.log("Invalid credentials.");
            res.redirect("/login");
        } else {

            // COMPARE HASHED PASSWORD
            const passwordCompare = await bcrypt.compare(req.body.password, userInDb.password)
            if(!passwordCompare){
                console.log("Wrong email or Password.");
                res.redirect("/login");
            } else {
                // SAVING A TOKEN TO THE COOKIE
                const token = jwt.sign({userId: userInDb._id}, jwtSecret, { expiresIn: '2h' });
                res.cookie("token", token, {httpOnly: true});
                console.log("Login Successful.");
                res.redirect(`users/${userInDb._id}`);
            }
        }
        
    } catch (error) {
        console.log(error);
    }
} 


// **************** LOGOUT ************************

const logoutFunc = (req, res) => {

    res.clearCookie("token");
    res.redirect("/login");
}

// EXPORT FUNCTION
module.exports = {
    renderLoginForm,
    loginAuth, 
    authorizedUser,
    logoutFunc, 
    currentUserId
}
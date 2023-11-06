const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// SCHEMA IS WHAT WILL DEFINE THE STRUCTURE OF OUR DOCUMENT THAT WILL BE STORE IN A COLLECTION.

// Schema IS A CONSTRUCTOR FUNCTION;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{
    // AUTO CREATES TIMESTAMPS
    timestamps: true
});

// CREATING A NEW MODEL THE FIRST PARAM IS THE COLLECTION NAME "users" AND SECOND IS LOGIN SCHEMA.
const userLogin = new mongoose.model("users", loginSchema)

module.exports = userLogin;
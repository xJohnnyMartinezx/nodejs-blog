const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// SCHEMA IS WHAT WILL DEFINE THE STRUCTURE OF OUR DOCUMENT THAT WILL BE STORE IN A COLLECTION.

// Schema IS A CONSTRUCTOR FUNCTION;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
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


// THE MODEL SURROUNDS THE SCHEMA AND PROVIDES AN INTERFACE TO COMMUNICATE WITH A DB COLLECTION FRO THAT DOC TYPE.

// .model() METHODS TAKES IN THE NAME OF THIS MODEL AS A FIRST ARG (SINGULAR), SECOND ARG IS THE SCHEMA CREATED ABOVE
const User = mongoose.model("User", userSchema);

// NEXT WE EXPORT THIS MODEL FOR USE ANYWHERE IN PROJECT.
module.exports = User;

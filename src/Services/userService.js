
     // *******************************************************************************
    // ATTEMPTED TO CREATE A USER SERVICE THAT WOULD HAVE CONTAINED ALL LOGIC SIMILIAR TO A JAVA PROJECT, BUT BECAUSE OF THE PROJECT STRUCTURE
    // FOR THIS NODE APP IT SEEMS REPETATIVE AS IN ITS CURRENT ITERATION routes.js IS ACTING AS A JAVA CONTROLLER AND userController.js IS 
    // ACTING AS A JAVA user service CLASS. I WILL EVENTUALLY COME BACK TO THIS LATER
    // *******************************************************************************


// const User = require("../Models/user");

// // **************** GET ALL USERS **************************
// const userIndexService = async (req, res) => {
//     User.find().sort({ createdAt: -1 })
//     .then((result) => {
//         //                                                 vvv BEING DIRECTLY REFERENCED IN INDEX HTML FOREACH
//         res.render("users/userIndex", { title: "All Users", users: result })
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// }


// // ************************* EXPORTS ***************************
// // *************************************************************

// // EXPORTING FUNCTIONS FOR USE IN userController.js
// module.exports = {
//     userIndexService
// }
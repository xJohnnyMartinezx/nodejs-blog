       
     // *******************************************************************************
    // ATTEMPTED TO CREATE SERVER CONNECTION HERE AND IMPORT IT TO app.js, BUT ISN'T AS STRIGHT FORWARD AS I THOUGHT.
    // WILL NEED TO DO MORE RESEARCH ON THIS.
    // *******************************************************************************

    
    
    // // NEED TO IMPORT EXPRESS USING REQUIRE METHOD.
    // const express = require("express");
       
    //    // THE REQUIRE METHOD ABOVE IS RETURNING A FUNCTION THAT IS BEING STORED IN THE const express VARIABLE.
    // // NEXT WE ARE INVOKING THAT RETURNED FUNCTION AND STORING IT IN app. SETTING A CONST NAMED "app" IS COMMON PRACTICE.
    // const app = express();
    // const userRoutes = require("../Routes/userRoutes");
    
    
    // // USING MONGOOSE PKG TO CONNECT TO THE DATABASE;
    // const mongoose = require("mongoose");


    //     // MONGODB CONNECTION
    //     const dbURI = "mongodb://localhost:27017/SimpleBlogDB"

    //     const dbConnection = () => {mongoose.connect(dbURI)
    //     .then((result) => {
    //          // console.log(result);
    //          // WANT TO LISTEN FOR REQUESTS AFTER CONN. TO DB IS ESTABLISHED.
    //         app.listen(3000);
    //         console.log("Connected to DB");
    
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }
    // app.use("/users", userRoutes);


    // module.exports = {
    //     dbConnection
    // }
    
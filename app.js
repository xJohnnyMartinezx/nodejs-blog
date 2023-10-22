// ******* INSTALLING EXPRESS *********
    // RUN npm install express AND THIS SHOUDL INSTALL IT AN ADD IT TO AS A DEPENDENCY


//******* USAGE ********/

    //AN app.js FILE IS TIPICALLY CREATED FOR EXPRESS APP.

    // NEED TO IMPORT EXPRESS USING REQUIRE METHOD.
    const express = require("express");

    // THE REQUIRE METHOD ABOVE IS RETURNING A FUNCTION THAT IS BEING STORED IN THE const express VARIABLE.
    // NEXT WE ARE INVOKING THAT RETURNED FUNCTION AND STORING IT IN app. SETTING A CONST NAMED "app" IS COMMON PRACTICE.
    const app = express();


    // LISTEN FOR REQUESTS:
    app.listen(3000);

    // RESPONDING TO REQUESTS:
    // app.get("/", (req, res) => {
    //     //.send() METHOD AUTO INFERS THE CONTENT WE ARE TRYING TO SEND.
    //     // ALSO, AUTO SETS THE CONTENT TYPE HEADER.
    //     // ALSO, INFERS THE STATUS CODES.
    //     res.send("<h1>Hello, World!<h1/>");

    // });


        //************ ROUNTING AND HTML ************ */

        app.get("/", (req, res) => {
            //res.sendFile() METHOD ACCEPTS AN ABSOLUTE PATH (ROOT),
            //BUT BECAUSE WE ARE PROVIDE A RELATIVE PATH (CURRETN WORKING DIR)
            //WE NEED TO PASS A SECOND "OPTIONS" ARGUMENT OF ROOT OBJECT. 
            res.sendFile("./views/index.html", {root: __dirname});
        });

        app.get("/about", (req, res) => {
            res.sendFile("./views/about.html", {root: __dirname});
        });


        // ******** REDIRECTS AND 404's ************


           // ***** REDIRECTS ******* 
            //SETUP A GET HANDLER FOR REDIRECTS
            app.get("/about-us", (req, res) => {
                //EXPRESS AUTO SEND THE RESPONSE TO THE BROWSER AND FORCES IT INTO A NEW REQUEST 
                //FOR "/about" AND ALSO AUTO SETS THE STATUS CODE.
                res.redirect("/about");
            });

          // ****** 404'S *******
          
            // .use() METHOD IS USED TO CREATED MIDDLEWARE AND FIRE MIDDLEWARE FUNCITONS IN EXPRESS
            // THE .use() FUNCTION IS GOING TO FIRE FOR EVERY SINGLE REQ COMING IN, 
            // BUT ONLY THE REQUEST REACHES THIS POINT IN THE CODE.
            // EXPRESS RUNS DOWN THIS FILE, LOOKING FOR A URL MATCH AND IF THERE ARE NO MATHCES IT
            // EVENTUALLY TRICKLE DOWN TO THIS POINT AND THE .use() FUNCTION WILL FIRE, THUS RENDERING THE 404 PAGE.
            //******* THIS FUNCTION MUST BE AT THE BOTTOM *******
            app.use((req, res) => {
                // HAVE TO MANUALLY SET A STATUS CODE. EXPRESS DOESN'T KNOW THIS IS AN ERROR
                res.status(404).sendFile("./views/404.html", {root: __dirname});
            })
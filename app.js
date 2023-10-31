
    // NEED TO IMPORT EXPRESS USING REQUIRE METHOD.
    const { log } = require("console");
    const express = require("express");
    const path = require("path");
    // const bcrypt = require(bcrypt);

    // USING MONGOOSE PKG TO CONNECT TO THE DATABASE;
    const mongoose = require("mongoose");

    const morgan = require("morgan");

    // IMPORTING BLOG ROUTES
    const blogRoutes = require("./src/routes/blogRoutes");
    const userRoutes = require("./src/routes/userRoutes");
const { collection } = require("./src/models/blog");

    // THE REQUIRE METHOD ABOVE IS RETURNING A FUNCTION THAT IS BEING STORED IN THE const express VARIABLE.
    // NEXT WE ARE INVOKING THAT RETURNED FUNCTION AND STORING IT IN app. SETTING A CONST NAMED "app" IS COMMON PRACTICE.
    const app = express();

    // MONGODB CONNECTION
    const dbURI = "mongodb://localhost:27017/SimpleBlogDB"

    mongoose.connect(dbURI)
    .then((result) => {
         // console.log(result);
         // WANT TO LISTEN FOR REQUESTS AFTER CONN. TO DB IS ESTABLISHED.
        app.listen(3000);
        console.log("Connected to DB");

    })
    .catch((error) => {
        console.log(error);
    })

    // SPECIFYING THAT WE WANT TO USE EJS AS OUR RENDERING/TEMPLATING ENGINE.
    app.set("view engine", "ejs");

    // ********* THIRD PARTY MIDDLEWARE **********   
    
        // STATIC FILES MIDDLEWARE
        //EXPOSING THE "PUBLIC" DIR TO THE BROWSER
            app.use(express.static("public"));

        // ARE PREBUILT FUNCTIONS FOR US TO USE IN OUR APP.
        // MORGAN MW EXAMPLE: 
            app.use(morgan("dev"));

        // POST REQUEST MIDDLEWARE
        // THIS MIDDLEWARE ALLOW TO USE req.body AND GET ALL OF THE PROPERTIES BEING PASSED.
            app.use(express.urlencoded({extended: true}));


        //************ ROUNTING AND HTML ************ */
        // ********* OLD METHOD BEFORE CREATING blogRoutes.js ************

        // ********* Login ***********
        app.get("/login", (req, res) => {
            res.render("login", {title : "Login"});
        })

        app.get("/", (req, res) => {
            res.render("home", {title : "Home"});
        });

        app.get("/about", (req, res) => {
            // res.sendFile("./views/about.html", {root: __dirname});
            res.render("about", {title : "About"});
        });

// ************************** BLOG ROUTES **********************************

        // USING OUR blogRoutes IMPORT VARIABLE AS A PARAM.
        // app.use(blogRoutes); 

        // BY ADDING A FIRST PARAM "/blogs" WE ARE SCOPING OUT THE BLOGS ROUTES.
        // BASICALLY ADDING A PREFIX TO OUR BLOG ROUTES EX: /blogs/index, /blogs/create, /blogs/:id
        app.use("/blogs", blogRoutes); 

// ************************** BLOG ROUTES **********************************

        app.use("/users", userRoutes);


//************************* REDIRECTS AND 404's ******************************


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

                // res.status(404).sendFile("./views/404.html", {root: __dirname});

                res.status(404).render("404", {title : "404"});
            });
// ******* INSTALLING EXPRESS *********
    // RUN npm install express AND THIS SHOUDL INSTALL IT AN ADD IT TO AS A DEPENDENCY
    // EXPRESS IS A NODE.JS WEB APPLICATION FRAMEWORK.


//******* USAGE ********/

    //AN app.js FILE IS TIPICALLY CREATED FOR EXPRESS APP.

    // NEED TO IMPORT EXPRESS USING REQUIRE METHOD.
    const { log } = require("console");
    const express = require("express");

    // USING MONGOOSE PKG TO CONNECT TO THE DATABASE;
    const mongoose = require("mongoose");
    // IMPORTING OUR MODEL(S)
    const Blog = require("./models/blog");


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

    // THIRD PARTY MIDDLEWARE
    const morgan = require("morgan");


    // SPECIFYING THAT WE WANT TO USE EJS AS OUR RENDERING/TEMPLATING ENGINE.
    // .set() METHOD ALLOWS US TO CONFIGURE SOME APPPLICATION SETTINGS.
    // SETTING THE VIEW ENGINE TO EJS
    // EJS VIEWS ENGINE WILL AUTOMATICALLY LOOK FOR VIEWS IN THE VIEWS DIR.
    app.set("view engine", "ejs");


    // *** FROM PREVIOUSE LESSON ***
    // // LISTEN FOR REQUESTS:
    // app.listen(3000);

    // RESPONDING TO REQUESTS:
    // app.get("/", (req, res) => {
    //     //.send() METHOD AUTO INFERS THE CONTENT WE ARE TRYING TO SEND.
    //     // ALSO, AUTO SETS THE CONTENT TYPE HEADER.
    //     // ALSO, INFERS THE STATUS CODES.
    //     res.send("<h1>Hello, World!<h1/>");

    // });

    // ********* MIDDLEWARE EXAMPLE **********
        // app.use((req, res) => {
        //     console.log("new req made:");
        //     console.log("host: ", req.hostname);
        //     console.log("path: ", req.path);
        //     console.log("mthod: ", req.method);
        // });
        // AFTER THIS MIDDLEWARE EXECUTES THE BROWSER WILL HANG, IT DOESNT KNOW WHAT TO DO AFTER. 
        // THIS IS WHERE .next() COMES IN.
    // ****** USING .next() **********
            // INSERT next AS A PARAM AND THE CALL IT AT THE END.
            // app.use((req, res, next) => {
            //     console.log("new req made:");
            //     console.log("host: ", req.hostname);
            //     console.log("path: ", req.path);
            //     console.log("mthod: ", req.method);
            //     next();
            //  // ^^^ TELLING EXPRESS THAT WE ARE DONE AND IT CAN CONTINUE TO THE NEXT PART.
            // });

            // app.use((req, res, next) => {
            //     console.log("IN THE NEXT MIDDLEWARE");
            //     next();
            // });

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


    //*********** TESTING MONGOOSE AND MONGO DB *********** */       
            // //  ***** SENDING DATA TO DB *******
            // app.get("/add-blog", (req, res) => {
            //     // CREATING A NEW INSTANCE OF Blog BY USING OUR IMPORT VARIABLE OF "Blog".
            //     const blog = new Blog({
            //         title: "My Second Blog",
            //         snippet: "About my second blog post",
            //         body: "This is the body to my second blog post."
            //     })

            //     blog.save()
            //     .then((results) => {
            //         res.send(results)
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // });

            // //  ***** RETREIVING DATA FROM DB *******
            // //  GETTING ALL BLOGS BY USING .find() METHOD.
            // app.get("/all-blogs", (req, res) => {
            //     // NEED TO USE THE Blog MODEL TO GET ALL DOCUMENTS FROM THIS COLLECTION.
            //     // .find() METHOD GETS ALL DOCS IN THE COLLECTION. (ASYNC SO TAKES SOME TIME TO DO.)
            //     Blog.find()
            //     .then((result) => {
            //         res.send(result)
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // });
            // // GETTING A SINGLE BLOG BY USING .findBy Id() METHOD.
            // app.get("/single-blog", (req, res) => {
            //     Blog.findById("65399f645a4cc54de208f452")
            //     .then((result) => {
            //         res.send(result)
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // });

            





        //************ ROUNTING AND HTML ************ */
        // ********* OLD METHOD BEFORE CREATING blogRoutes.js ************

        app.get("/", (req, res) => {
            //res.sendFile() METHOD ACCEPTS AN ABSOLUTE PATH (ROOT),
            //BUT BECAUSE WE ARE PROVIDE A RELATIVE PATH (CURRETN WORKING DIR)
            //WE NEED TO PASS A SECOND "OPTIONS" ARGUMENT OF ROOT OBJECT. 

            // res.sendFile("./views/index.html", {root: __dirname});

            //WE EJS WE ARE NO LONGER SENDING A FILE
            // WE WILL NOW RENDER A VIEW BY PROVIDING THE NAME OF THE EJS FILE IN THE VIEWS DIR.


            // WE CAN PASS DATA TO OUR HTML AS A SECOND PARAM IN THE FOR OF AN OBJ.
            // OBJS WILL BE ACCESSED THROUGH THE TITLE PROPERTY AND USE EJS SYNTAX IN EJS FILE.
            // EAXMPLE ADDING TO THE TITLE TAG:
            // res.render("index", {title : "Home"});

            // PASSING DATA EXAMPLE:

            // const blogs = [
            //         {
            //             title : "My First Blog",
            //             snippet : "This is the snippet for my First blog."
            //         },
            //         {
            //             title : "My Second Blog",
            //             snippet : "This is the snippet for my Second blog."
            //         },
            //         {
            //             title : "My Third Blog",
            //             snippet : "This is the snippet for my Third blog."
            //         }
            // ];

            // // res.render("index", {title : "Home", blogs : blogs});
            // // BECAUSE USING THE SAME NAME ^^^ WE CAN USE SHORTHAND.
            // res.render("index", {title : "Home", blogs});
            res.render("home", {title : "Home"});
           
        

            // ********** HOW DOES THIS WORK???? ************
                // VIEW FILES (EJS) LIVE ON THE SERVER.
                // WHEN WE WANT TO RENDER ONE THROUGH THE BROWSER, IT IS PASSED TO THE EJS VIEW ENGINE TO BE PROCESSED.
                // VIEW ENGINE LOOKS FOR ANY DYNAMIC CONTENT (VARIABLES, LOOPS, CONDITIONALS)
                // WHEN DYNAMIC CONTENT IS FOUND IT PROCESSES THE RESULTING HTML CODE AND PRODUCES A VALID HTML PAGE BASED ON
                // THE TEMPLATE WRITTEN.
                // LAST, THAT HTML PAGE ALONG WITH THE RESULTING DATA IN IT WILL BE RETURN TO THE BROWSER.
                // **** THIS ENTIRE PROCESS IS CALLED SERVER SIDE RENDERING *********


        });

        app.get("/about", (req, res) => {
            // res.sendFile("./views/about.html", {root: __dirname});
            res.render("about", {title : "About"});
        });

// ************************** BLOG ROUTES **********************************

        app.get("/blogs", (req, res) => {
            // CAN CHAIN ON METHODS TO FUTHER CUSTOMIZE/FILTER ITEMS.
            // EXAMPLE: .sort() METHOD. THE (-1) MEANS DECENDING ORDER, SO NEWEST BLOG WILL BE ON TOP OF PAGE.
                // Blog.find()
                Blog.find().sort({createdAt: -1})
                .then((result) => {
                    // console.log(result);
                    res.render("index", {title: "All Blogs", blogs: result})
                })
                .catch((error) => {
                    console.log(error);
                });
            });

     // ******* POST REQUEST ********
            app.post("/blogs",(req, res) => {
                const blog = new Blog(req.body);

                blog.save()
                .then((result) => {
                    res.redirect("/blogs");
                })
                .catch((error) => {
                    console.log(error);
                })
            });

    // ************ ROUTE PARAMETERS ************
          // ***** FIND BY ID ********  
            // ARE THE VARIABLE PARTS OF THE ROUTE THAT MAY CHANGE EX: ID.
            // localhost:3000/blogs/:id (id CAN CHANGE)
            // NEED TO USE : TO DENOTE A ROUTE PARAMETER.
                app.get("/blogs/:id", (req, res) => {
                    // NEED TO EXTRACT THE id BY USING THE req OBJ
                    const id = req.params.id; //.id IS WHATEVER THE PARA NAME IS. IN THIS CASE IT'S "id" FROM LINE 243.
                    //   console.log(id);
                    Blog.findById(id)
                    // THIS vvv result WILL BE THE SINGLE BLOG BASED ON THE CURRENT id.
                    .then((result) => {
                        // NEXT WE WANT TO RENDER THE deatails PAGE.
                                    // blog vvv IS JUST PROP NAME, CAN BE ANYTHING. 
                        res.render("details", {blog: result, title: "Blog Detail"})
                    })                                    // ^^^ THIS IS JUST THE PAGE TITLE.              
                    .catch((error) => {
                        console.log(error);
                    })

                })

          // ***** DELETE BY ID ********   
          
                app.delete("/blogs/:id", (req, res) => {
                    const id = req.params.id;
                    Blog.findByIdAndDelete(id)
                    .then((result) => {
                        // WHEN SENDING AN AJAX REQUEST, WE CANNOT USE res.redirect IN NODE AS A RESPONSE. 
                        // WE HAVE TO SEND JSON OR TEXT DATA BACK TO THE BROWSER.
                        // res.redirect("/blogs")  *** CANNOT DO THIS.
                        res.json({ redirect: "/blogs"})
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })




        app.get("/blogs/create", (req, res) => {
            res.render("create", {title : "Create"})
        })


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

                // res.status(404).sendFile("./views/404.html", {root: __dirname});

                res.status(404).render("404", {title : "404"});
            });
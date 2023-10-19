
 //******** CREATING A SERVER ********

    const http = require("http"); //NEED TO IMPORT THE "http" NODE CORE MODULE.

    // vvv FOR ILLUSTRATION ONLY. SERVER INSTANCE CAN BE STORED IN A VARIABLE FOR USE SOMEWHERE ELSE.
    // const testServer = http.createServer();

    // TAKES IN ONE ARG THAT IS A CALLBACK FUNCTION.
    // CALLBACK FUNCTION WILL RUN EVERTIME A REQUEST COMES INTO OUR SERVER.
    // CALLBACK FUNCTION GIVES US ACCESS TO TWO OBJS (req, res).
    // req OBJ = CONTAINS INFO SUCH AS URL, REQ TYPE (GET, POST, DELETE), AND OTEHR INFO.
    // res OBJ = THIS OBJ IS USED TO SEND A RESPONSE TO THE USER.
    
        // const testServer = http.createServer((req, res) => {
        //         console.log("request made");
        //     });
    // ^^^ AT THIS POINT testServer IS NOT ACTUALLY DOING ANYTHING, IT'S NOT ACTIVELY LISTENING FOR ANY REQUESTS BEING SENT TO IT.

    // vvv TO ACTIVATE AND USE THIS SERVER WE HAVE TO INVOKE THE listen() METHOD.
    // listen() METHOD ACCEPTS A PORT NUMBER AS AN ARG, AND A SECOND ARG THAT IS THE HOST NAME. DEFAULT 2ND ARG IS "localhost". THE THIRD ARG IS A FUNCTION THAT IS CALLED THE SERVER STARTS LISTENING.

        // testServer.listen(3000, "localhost", () => {
        //     console.log("listening for requests on port 3000");
        // });


 //******** LOCAHOST AND PORT NUMBERS ***********
 
        // LOCALHOST IS LIKE A DOMAIN NAME ON THE WEB.
            // THIS "localhost" DOMAIN TAKE TO A VERY SPECIFIC IP ADDRESS CALLED A LOOPBACK IP ADDRESS.
            // THIS "localhost" IP IS 127.0.0.1 AND ROUTES US BCAK DIRECTLY TO YOUR COMPUTER.
            // THIS MEANS WHEN WE CONNECT TO A localhost IN OUR BROWSER THE BROWSER IS CONNECTING BACK TO OUR OWN COMPUTER, WHICH IS THEN ACTING AS A HOST FOR OUR WEBSITE.
            // THE HOST NAME localhost MEANS LISTEN FOR REQUESTS COMING TO OUR OWN COMPUTER.

        // PORT NUMBERS:
            // ARE LIKE DOORS INTO A COMPUTER IN WHICH INTERNET COMMS CAN BE MADE TO DIFFERENT PROGRAMS.
            // PORT NUMS REPRESENT A SPECIFIC CHANNEL/GATEWAY WHERE A CERTAIN PIECE OF SOFTWARE SHOULD COMMUNICATE THROUGH.
            // SOFTWARE SUCH AS EMAIL CLIENTS, SKYPE, ETC

        
            // OUR SERVER ALSO NEED ITS OWN PORT NUMBER (MOST OF THE TIME FOR DEV PRUPOSES ITS 3000). 
            // CAN BE ANY PORT NUM AS LONG AS ITS NOT BEING USED BY ANOTHER PROGRAM.
                // localhost:3000
                // control + c TO STOP THE SERVER.
//*******************************************************      



// **************** REQUESTS AND RESPOSES *****************
// ********************************************************

    // ******* THE REQUEST OBJ *************

        // // ANYTIME A CHANGE IS MADE TO testServer THE PARENT FILE NEEDS TO BE RE-RAN IN THE TERMINAL. (node testServer)
        // const testServer = http.createServer((req, res) => {
        //     console.log(req.url, req.method);
        //     //WILL USE (req.url, req.method) LATER FOR ROUTING THE USER TO THE PROPER PAGE;
        // });



        // testServer.listen(3000, "localhost", () => {
        //     console.log("listening for requests on port 3000");
        // });


    // ******* THE RESPOSE OBJ *************
    
        // const testServer = http.createServer((req, res) => {
        //     console.log(req.url, req.method);
        //     //res OBJ IS USED TO SEND A RESPONSE TO THE BROWSER

        //     // SETTING HEADER CONTENT TYPE:
        //     // res.setHeader("Content-Type", "text/plain"); //CAN BE HTML, JSON, ETC
        //     res.setHeader("Content-Type", "text/html");

        //     // ACTUALLY SENDING THE DATA TO THE BROWSER;
        //     // res.write("Hello, World!");
        //     res.write("<h1>Hello, World!<h1>");
        //     res.write("<h5>Hello, World!<h5>");
        //     // HAVE TO END THE RESPONSE IN ORDER TO SEND THE DATA TO THE BROWSER
        //     res.end();

        // });

        // testServer.listen(3000, "localhost", () => {
        //     console.log("listening for requests on port 3000");
        // });


    // ********** RETURNING HTML PAGES *************   

        //     const fs = require("fs");
    
    
        //         const testServer = http.createServer((req, res) => {
        //     console.log(req.url, req.method);

        //     res.setHeader("Content-Type", "text/html");
        //     fs.readFile("../views/index.html", (error, data) => {
        //         if (error) {
        //             console.log(error);
        //             res.end(); //ALWAYS WANT TO END THIS RESPONSE AS WELL.
        //         } else {
        //             // res.write(data);
        //             // res.end();
        //             res.end(data); //IF ONLY SENDING ONE PIECE OF DATA, IT CAN BE DIRECTLY INPUTTED INTO .end() METHOD.
        //         }
        //     });
        // });

        // testServer.listen(3000, "localhost", () => {
        //     console.log("listening for requests on port 3000");
        // });



    // ********** BASIC ROUTING *************

        const fs = require("fs");
                
                
        const testServer = http.createServer((req, res) => {
            console.log(req.url, req.method);

            res.setHeader("Content-Type", "text/html");

            // SET UP PATH VARIBLE ASSIGN TO VIEWS DIR. 
            // USING A SWICTH CASE TO DETERMINE WHAT URL THE USER IS ENTERING AND REDIRECT ACCORDINGLY.
            let path = "../views/";
                switch(req.url) {
                    case "/" : path += "index.html";
                        break;
                    case "/about" : path += "about.html";
                        break;
                    default : path += "404.html";
                        break;        
                }
                // fs.readFile("../views/index.html", (error, data) => {
                     // vvv INSTEAD OF HADRCODING AN HTML PATH, WE CAN NOW USE THE path VARIABLE WE CREATED.
            fs.readFile(path, (error, data) => {
                if (error) {
                    console.log(error);
                    res.end(); //ALWAYS WANT TO END THIS RESPONSE AS WELL.
                } else {
                    res.end(data);
                }
            });
            });

        testServer.listen(3000, "localhost", () => {
            console.log("listening for requests on port 3000");
            });
                


const http = require("http"); //NEED TO IMPORT THE "http" NODE CORE MODULE.
const fs = require("fs");
const _ = require("lodash"); //BEING ACCESSED FROM THE NODE MODULES DIR. NO NEED TO SPECIFY.
                
                
const mainServer = http.createServer((req, res) => {
    // LODASH EXAMPLE: 
    const num = _.random(0, 20);
    console.log(`random number is: ${num}`);
    // .once() METHOD WILL ONLY THE PASSED PARAM TO RUN ONCE. IN THIS CASE THE ARROW FUNC.
    const greet = _.once(() => {
        console.log("hello");
    });

    greet();
    greet();

    res.setHeader("Content-Type", "text/html");

    // SET UP PATH VARIBLE ASSIGN TO VIEWS DIR. 
    // USING A SWICTH CASE TO DETERMINE WHAT URL THE USER IS ENTERING AND REDIRECT ACCORDINGLY.
    let path = "../views/";
        switch(req.url) {
            case "/" : path += "index.html";
            res.statusCode = 200; //SETTING A STATUS CODE FOR THE RESPONSE.
                break;
        //*********** REDIRECT EXAMPLE ********* */ 
            case "/about" : path += "about.html";
            res.statusCode = 200;
                break;
            case "/about-me" :
            res.statusCode = 301;  // 301 STATUS CODE (RESOURCE MOVED)
            res.setHeader("Location", "/about"); //SETTING LOCATION HEADER WITH NEW PATH.
            res.end(); // ALWAYS WANT TO END THE RESPOSE
                break;
            default : path += "404.html";
            res.statusCode = 404;
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

mainServer.listen(3000, "localhost", () => {
    console.log("listening for requests on port 3000");
    });
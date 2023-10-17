// THE GLOBAL OBJECT
// NODE GIVES US ACCESS TO GLOBAL OBJECT THAT CONTAINS METHODS WE CAN USE.

const { log } = require("console")


// **************** IMPORTING AND EXPORTING ***************
// ********************************************************


// require() METHOD IS USED TO IMPORT FILES FROM OTHER JS FILES.
// IT ACCEPTS A REALTIVE PATH (IN string FORMAT) TO THE FILE AS A PARAM.

// USE module.exports TO EXPORT SPECIFIC CONTENT/VARIABLES FROM THE FILE THAT CONTAINS THE CONTENT(S) TO BE EXPORTED.
// TO EXPORT MULTIPLE CONTENT/VARIABLE USE module.exports{VARIABLES, SEPARATED, BY, COMMAS} 
// USE DOT NOTATION TO ACCESS EXPORTED VARIABLES EX. 

// const impotedPeopleArr = require("./people");
// console.log(impotedPeopleArr.VARIABLES, impotedPeopleArr.SEPARATED, impotedPeopleArr.BY , ETC);



//  CAN SET module.exports = TO AN EMPTY OBJECT AND USE KEY VALUE PAIR TO EXPORT MULTIPLE ITEMS.
// WITH THE KEY A NAME PLACEHOLDER (CAN BE ANTHING) THE VALUE BEING THE ACTUAL VARIABLE YOU WANT TO EXPORT.
//  CAN ALSO GIVE THE GIVE THE KEY AND VALUE THE SAME NAME AS THE VARIABLE AND AVOID HAVING TO TYPE BOTH KEY AND VALUE.
// EAMPLE:

// let people = ["Johnny", "Josh", "Dave", "Mike", "Luis"];
// let ages = [20, 45, 18, 27, 33];

// ******** USING KEY VALUE PAIRS ***********
// module.exports = {
    // whatever name I want to set as (key) : the variable I want to reference, in this case (people),
    // peopleNames : people,
    // peopleAges : ages
// }

// ******** USING A SINGLE PLACEHOLDER REFERENCE (SHORT-CUT/HAND)***********
// module.exports = {
    // variableName, 
    // people,
    // ages
// }

// require() CAN BE ASSIGNED TO A const Ojb (const {} = required()) TO IMPORT MULTIPLE ITEMS FROM A FILE.
// EXAMPLE:

// const {people, ages} = require("./people");

// console.log(people, ages);


// NODE.JS COMES WITH BUILT IN PREMADE MODULES FOR US TO USE.
// IN ORDER TO USE THEM THEY AHVE TO IMPORTED LIKE THIS:
//  const os = require("os");

// require("os"); IS ALREADY BUILT INT0 NODE, THERE IS NO NEED TO CREATE A FILE NAME "OS".
// EXAMPLE METHODS THAT CAN BE USED;
//  os.plstform(), os.homedir(), os.machine(), os.networkInterfaces(), os.type(), os.uptime()


// ****************** THE FILE SYSTEM *********************
// ********************************************************

// **** THE ABILITY TO INTERACT WITH THE FILE SYSTEM USING JS IS SOMETHING THAT CANNOT BE DONE WITHOUT NODE.JS. 

// IN ODER TO INTERACT WITH THE FILE SYSTEM YOU MUST THE BUILT IN CORE MODULE CALLED "FS"
// EXAMPLE:
// const fs = require("fs");

// ****** READING FILES
    // TAKES TWO PARAMS (FILE PATH, CALLBACK FUNCTION)
    // CALLBACK FUNCTION TAKES IN TWO PARAMS. AN error AND data.

    // fs.readFile("realative file path");  

    // EXAMPLE:
        // ("./" = current directory)

        //  fs.readFile("./docs/blog.txt", (error, data) => {
            // if (error) {
            //    console.log(error);
            // } 
            // THIS CONSOLE LOG WILL RETURN BUFFER DATA. HAVE TO USE toString METHOD.
            //    console.log(data);
            //    console.log(data.toString);                   
        // })


 // ********* WRITING FILES *********
    // TAKES THREE PARAMS (FILE PATH, TEXT TO BE WRITTEN, CALLBACK FUNCTION)

    // fs.writeFile("realative file path");  

    // EXAMPLE:
        // ("./" = current directory)

        //  fs.writeFile("./docs/blog.txt","Hello, world!", () => {
            //    console.log("file was written");
            // })
    // IF FILE DOESN'T EXISTS IT WILL BE CREATED.
        // fs.writeFile("./docs/blog2.txt","Hello, newly created file", () => {
        //     console.log("file was written");
        // }) 


 // ********* DIRECTORIES *********   
 
    // CREATING A DIRECTORY
    // fs.mkdir(dir path);

    // ALWAYS WANT TO CHECK IF DIR ALREADY EXISTS BEFORE CREATING IT.
    // EXAMPLE:
        // if(!fs.existsSync("./assest")){
        //     fs.mkdir("./assets", (error) => {
        //         if (error) {
        //             console.log(error);
        //         }
        //         console.log("directory succefully created.");
        //     })
        // }


    // DELETING A DIRECTORY
    // fs.rmdir(dir path);    

    // EXAMPLE:
        // fs.rmdir("./assets", (error) =>{
            // if (error){
                // console.log(error);
            // }
            // console.log("forlder/directory created");
        // })


     // DELETING A FILES
        // ALWAYS WANT TO CHECK IF FILE ALREADY EXISTS BEFORE CREATING IT.
        // EXAMPLE:

        // if(!fs.existsSync("./docs/deleteMe.txt")){
        //     fs.unlink("./docs/deleteMe.txt", (error) => {
        //         if(error) {
        //             console.log(error);
        //         }
        //         console.log("File successfully deleted.")
        //     });
        // }


    // ****************** STREAMS AND BUFFERS *********************
    // ************************************************************

    
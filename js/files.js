const { log } = require("console");
const fs = require("fs");
   
   
// ********* READING FILES *********
// **** WILL RUN ASYNC (OTHER ITEM CAN BE EXECUTED BEFORE OR AFTER)
//    fs.readFile("./docs/blog.txt", (error, data) => {
//             if (error) {
//                console.log(error);
//             } 
//                 // THIS CONSOLE LOG WILL RETURN BUFFER DATA. HAVE TO USE toString() METHOD.
//                console.log(data);
//                console.log(data.toString());             
//         })
//         console.log("last line"); //ASYNC EXAMPLE;




 // ********* WRITING FILES ********* 

    // // EXAMPLE:
    //     // ("./" = current directory)

    //      fs.writeFile("./docs/blog.txt","Hello, world!", () => {
    //            console.log("file was written");
    //         }) 
    // // IF FILE DOESN'T EXISTS IT WILL BE CREATED.
    //     fs.writeFile("./docs/blog2.txt","Hello, newly created file", () => {
    //         console.log("file was written");
    //     }) 





 // ********* DIRECTORIES *********  
 
    // CREATING A DIRECTORY
    // fs.mkdir(dir path);

    // ALWAYS WANT TO CHECK IF DIR ALREADY EXISTS BEFORE CREATING IT.
    // EXAMPLE:
    if(!fs.existsSync("./assest")){
        fs.mkdir("./assets", (error) => {
            if (error) {
                console.log(error);
            }
            console.log("directory succefully created.");
        })
    }


    // DELETING A DIRECTORY
    // fs.rmdir(dir path);    

    // EXAMPLE:
        // fs.rmdir("./assets", (error) =>{
        //     if (error){
        //         console.log(error);
        //     }
        //     console.log("forlder/directory created");
        // })



     // DELETING A FILES
        // ALWAYS WANT TO CHECK IF FILE ALREADY EXISTS BEFORE DELETING IT.
        // EXAMPLE:

        if(fs.existsSync("./docs/deleteMe.txt")){
            fs.unlink("./docs/deleteMe.txt", (error) => {
                if(error) {
                    console.log(error);
                }
                console.log("File successfully deleted.")
            });
        }


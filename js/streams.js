const fs = require("fs");  //NEED THIS ON EVERY FILE WHERE WE WANT TO ACCESS/USE THE FILE SYSTEM.


// ************* READING A STREAM ***************

// THIS EXAMPLE BELOW WILL RETURN RAW BUFFER CHUNKS. NEXT EXAMPLE RETURNS ENCODED BUFFER CHUNKS (SPECIFIED BY USING A SECOND PARAM);
// const readMyStream = fs.ReadStream("./docs/blog3.txt");

// readMyStream.on("data", (chunk) => {
//     console.log("---------- NEW CHUNK --------");
//     console.log(chunk);
// });


        // CAN ADD A SECOND PARAM OF TYPE OBJ TO SPECIFY OTHER PARAMS: IN THIS EXAMPLE A ENCODING TYPE.
        const readMyStream = fs.createReadStream("./docs/blog3.txt", {encoding : "utf8"})

          // EXAMPLE:

                // readMyStream.on("data", (chunk) => {            // (.on) IS AN EVENT LISTENER ATTACHED TO readMyStream VARIABLE.
                //     console.log("***********************");     // WE'RE USING IT TO LISTEN FOR A "data" EVENT ON readMyStream.
                //     console.log("------- NEW CHUNK -----");     // IN OTHER WORDS EVERYTIME WE RECIEVE A BUFFER OF DATA ON THE STREAM.
                //     console.log("***********************");  
                //     console.log(chunk);                       

                // })

// ************* WRITTING TO A STREAM ***************

          // EXAMPLE:  

                const writeMyStream = fs.createWriteStream("./docs/blog4.txt");

                // readMyStream.on("data", (chunk) => {          
                //     console.log("------- NEW CHUNK -----");   
                //     console.log(chunk);                       
                //     writeMyStream.write("\nNEW CHUNK\n");
                //     writeMyStream.write(chunk);
                // })        

    // ***** USING PIPING **********
        // ACCOMPLISHES THE RESULT AS ABOVE, BUT IN A MORE STREAMLINED MANNER.
        // WHEN USING A PIPE IT MUST BE FROM A READABLE STREAM TO A WRITABLE STREAM.

        readMyStream.pipe(writeMyStream);


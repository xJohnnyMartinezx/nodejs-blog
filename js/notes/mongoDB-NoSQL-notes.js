// ************* MONGO DB *********
    // IS A NOSQL DATABASE
        // IT DOES **NOT** USE TABLES, ROWS, OR COLUMNS.
        // IT COLLECTIONS AND DOCUMENTS.

    // ***** HOW DOES IT WORK? ******
        //  IT'S SPLIT UP INTO COLLECTIONS, WHICH LIKE TABLES IN SQL. 
            // EACH COLLECTION WILL USED TO STORE PERTICULAR TYPE OF DATA.
            // EXAMPLE:
                // A "USER" COLLECTION WOULD BE USED TO STORE USER DOCUMENTS
                // A "BLOG" COLLECTION WOULD BE USED TO STORE BLOG DOCS

            // YOU CAN HAVE AS MANY COLLECTIONS AS YOU WANT, BUT EACH COLLECTION CAN ONLY HAVE ONE TYPE OF DOCUMENT. (USER OR BLOG) 
            
                // BLOG DOCUMENT EXAMPLE:
                    // VERY SIMILAR TO A JSON OBJ.
                    // EACH DOCUMENT WILL BE AN INDIVIDUAL BLOG. (SIMILARLY EACH USER DOCUMENT WILL BE AN INDIVIDUAL USER.)
                    // id IS USUALLY AUTO GENERATED.

//                   {
//                       "_id" : ObjectId(12345),
//                       "title" : "My First Blog",
//                       "snippet" : "All about my blog",
//                       "body" : "The conetents of my first blog post.",
//                   }
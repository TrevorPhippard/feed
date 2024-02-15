import multer from "multer";
import fs, { exists } from "fs"

//set Storage Engine

/** ---------------------------------------------------------------------------
 *  @multer
 * --------------------------------------------------------------------------- */
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            console.log(file)
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname );
        }
    }
);

var upload = multer( { storage: storage } );



// const upload = multer({
//     storage: storage
// }).single("file")

export default upload.single('file');
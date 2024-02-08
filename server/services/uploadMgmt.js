import multer from "multer";
import fs, { exists } from "fs"

//set Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        const dir = `./tmp/${req.params.id.split(':')[1]}`;
        fs.exists(dir, (exists)=>{
            if(!exists){
                return fs.mkdir(dir, (error)=> callback(error, dir));
            }
            return callback(null, dir)

        })
    },
    filename: function(req, file, callback){
        let newFileName = Date.now()+'_'+file.originalname;
         callback(null, newFileName)
    }
});

const upload = multer({
    storage
}).single("file")

export default upload;
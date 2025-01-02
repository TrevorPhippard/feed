import fs from "fs";

function timeStampFile(originalFileName){
    const fileName = originalFileName.split(".");
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    return `${fileName[0]}${timestamp}.${fileName[1]}`
}

function uploaderService( uploadFile, destination, callback){
        if(!fs.existsSync(destination)){
            fs.mkdirSync(destination, {recursive: true})
        }
        let timeStampName = timeStampFile(uploadFile.name);
        const finalPath = `${destination}/${timeStampName}`
        uploadFile.mv(finalPath);
    return callback( timeStampName, finalPath);
}

export default uploaderService;
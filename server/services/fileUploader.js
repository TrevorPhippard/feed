import fs from 'fs';

function timeStampFile(originalFileName) {
    var fileName = originalFileName.split('.');
    var timestamp = new Date().toISOString().replace(/:/g, '-');
    return `${fileName[0]}${timestamp}.${fileName[1]}`
}

function uploaderService(req, res, callback) {
    const destination = './uploads';
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true })
    }
    let uploadFile = req.files.file;
    let timeStampName = timeStampFile(uploadFile.name);
    const finalPath = `${destination}/${timeStampName}`
    uploadFile.mv(finalPath)
    res.send(timeStampName)
}

export default uploaderService;
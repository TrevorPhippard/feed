import express from "express";
import uploaderService from "../../../../services/fileUploader";

const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.files) {
        return res.status(200).send("file transfer failed");
    } else {
        uploaderService(req, res, (error: Error) => {
            if (error) {
                return res.status(500).send("Internal Server Error");
            } else {
                if(req.file && req.file.filename){
                    return res.status(500).send(req.file.filename);
                }else{
                    return res.status(500).json({
                        message: "no file name"
                    });
                }
            }
        });
    }
});


export default router;
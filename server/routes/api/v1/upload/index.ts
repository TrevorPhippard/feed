import express from "express";
import uploaderService from "../../../../services/fileUploader";

const router = express.Router();

router.post("/", async (req, res) => {
    if (!req.file || !req.file.filename) {
        return res.status(200).send("file transfer failed");
    } else {
        try {
            return uploaderService(req, res, (filename:string, finalPath:string) => {
                console.log(finalPath)
                return res.status(500).send(filename);
            });
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
});


export default router;
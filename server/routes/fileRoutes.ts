import express from "express";
import { uploadFile } from "../controllers/fileController";

const router = express.Router();

router.route("/upload")
    .post(uploadFile);

export default router;
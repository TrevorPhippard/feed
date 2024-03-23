import express from "express";
import { uploadFile, addResource, getAllResources, getResourceById, updateResourceById, removeResource } from "../controllers/fileController";

const router = express.Router();

router.route("/upload")
    .post(uploadFile);//uploadFile

router.route("/resource")
    .get(getAllResources)
    .post(addResource)

router.route("/resource:id")
    .get(getResourceById)
    .put(updateResourceById)
    .delete(removeResource);

export default router;
import express  from "express";
import  { createDeployment, getAllDeployments, getDeploymentById, updateDeploymentById, deleteDeploymentById} from "../controllers/deploymentController";

const router = express.Router();

router.route("/deployments")
    .get(getAllDeployments)
    .post(createDeployment);

router.route("/deployments/:id")
    .get(getDeploymentById)
    .put(updateDeploymentById)
    .delete(deleteDeploymentById);

export default router;
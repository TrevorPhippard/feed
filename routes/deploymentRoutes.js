const express = require("express");
const { createDeployment, getAllDeployments, getDeploymentById, updateDeploymentById, deleteDeploymentById} = require("../controllers/deploymentController");

const router = express.Router();

router.route("/deployments")
    // Create a new Deployment
    .get(getAllDeployments)
    // Get all Deployments
    .post(createDeployment);
router.route("/deployments/:id")
    // Get a Deployment by ID
    .get(getDeploymentById)
    // Update a Deployment by ID
    .put(updateDeploymentById)
    // Delete a Deployment by ID
    .delete(deleteDeploymentById)
// Export the router
module.exports = router;
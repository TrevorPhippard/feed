//controllers.js
const Deployment = require('../models/deploymentModel');

// for creating a new deployment
// Controller for creating a new deployment
exports.createDeployment = async (req, res) => {
  try {
    const { id, parter_deployed_to, body, user_id, status } = req.body;
    const deployment = await Deployment.create({ id, parter_deployed_to, body, user_id, status });
    res.json({ message: 'deployment created successfully', deployment });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// getting all deployments
exports.getAllDeployments = async (req, res) => {
    try {
      const deployments = await Deployment.findAll();
      res.json(deployments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Controller for getting a deployment by ID
exports.getDeploymentById = async (req, res) => {
    try {
      const deploymentId = req.params.id;
      const deployment = await Deployment.findByPk(deploymentId);
      if (!deployment) {
        res.status(404).send('deployment not found');
      } else {
        res.json(deployment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  
  // updating a deployment
exports.updateDeploymentById = async (req, res) => {
    try {
      const deploymentId = req.params.id;
      const { id, parter_deployed_to, body, user_id, status } = req.body;
      const deployment = await Deployment.findByPk(deploymentId);
      if (!deployment) {
        res.status(404).send('deployment not found');
      } else {
        
        
        deployment.id = id, 
        deployment.parter_deployed_to = parter_deployed_to, 
        deployment.body = body, 
        deployment.user_id = user_id, 
        deployment.status = status


        await deployment.save();
        res.json({ message: 'deployment updated successfully', deployment });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // deleting a user by ID
  exports.deleteDeploymentById = async (req, res) => {
    try {
      const deploymentId = req.params.id;
      const deployment = await Deployment.findByPk(deploymentId);
      if (!deployment) {
        res.status(404).send('deployment not found');
      } else {
        await deployment.destroy();
        res.send('deployment deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
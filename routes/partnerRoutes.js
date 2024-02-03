const express = require("express");
const { createPartner, getAllPartners, getPartnerById, updatePartnerById, deletePartnerById} = require("../controllers/partnerController");

const router = express.Router();

router.route("/partners")
    // Create a new partner
    .get(getAllPartners)
    // Get all partners
    .post(createPartner);
router.route("/partners/:id")
    // Get a partner by ID
    .get(getPartnerById)
    // Update a partner by ID
    .put(updatePartnerById)
    // Delete a partner by ID
    .delete(deletePartnerById)
// Export the router
module.exports = router;
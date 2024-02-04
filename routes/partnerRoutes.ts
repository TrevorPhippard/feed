import express  from "express";
import { createPartner, getAllPartners, getPartnerById, updatePartnerById, deletePartnerById} from "../controllers/partnerController";

const router = express.Router();

router.route("/partners")
    .get(getAllPartners)
    .post(createPartner);

router.route("/partners/:id")
    .get(getPartnerById)
    .put(updatePartnerById)
    .delete(deletePartnerById)

export default router;
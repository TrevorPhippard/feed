import express from "express";
import Model from "../../../../models/message.model";
import BaseController from "../../../../controllers/baseController";
import { Op } from "sequelize";

const Controller = new BaseController(Model);

const router = express.Router();

// request previous messages
router.get("/", async (req, res) => {
    try {
        const entries = await Controller.getAllEntries()
        return res.json(entries);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

router.post("/", async (req, res) => {
    try {
        const {  username, room_id, message_body } = req.body;
        console.log(req.body)
        const result = await Controller.addEntry({ username, room_id, message_body})
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/:room_id", async (req, res) => {
    try {
        const room_id = req.params.room_id;
        const result = await Controller.getEntryByQuery({
            where: {
                room_id: {
                [Op.eq]: room_id,
              },
            },
        })
        
        if (!result) {
            return false
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

router.put("/:id", async (req, res) => {
    try {
        const routeId = Number(req.params.id);
        const { id, username, room_id, message_body } = req.body;
        const result = await Controller.updateEntryById(routeId, {id, username, room_id, message_body })
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const routeId = req.params.id;
        const result = await Controller.removeEntryById(routeId);
        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.send("item deleted successfully");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});


export default router;
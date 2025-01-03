import express from "express";
import Model from "../../../../models/trivia.model";
import BaseController from "../../../../controllers/baseController";

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
        const { gameName, slides, Trivia_id } = req.body;
        const result = await Controller.addEntry({ gameName, slides, Trivia_id})
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});



router.get("/:id", async (req, res) => {
    try {
        const result = await Controller.getEntryById(req.params.id)
        if (!result) {
            return res.status(404).send("item not found");
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
        const { id, gameName, slides, Trivia_id } = req.body;
        const result = await Controller.updateEntryById(routeId, {id, gameName, slides, Trivia_id})
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
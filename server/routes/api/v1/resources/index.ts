import express from "express";
import Model from "../../../../models/resource.model";
import BaseController from "../../../../controllers/baseController";

const Controller = new BaseController(Model);

const router = express.Router();

// request previous messages
router.get("/", async (req, res) => {
    try {
        const entries = await Controller.getAllEntries()
        return res.json(entries);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
})

router.post("/", async (req, res) => {
    try {
        const { filename } = req.body;
        const result = await Controller.addEntry({filename})
        return res.status(200).json({
            id:result.id,
            filename:filename
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.get("/:id", async (req, res) => {
    try {
        const result = await Controller.getEntryById(req.params.id);

        if (!result) {
            return res.status(404).send("item not found");
        } else {
            return res.json(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
})

router.put("/:id", async (req, res) => {
    try {
        const routeId = Number(req.params.id);
        const { filename } = req.body;
        const result = await Controller.updateEntryById(routeId, {filename})
        if (result) {
            return res.json(result );
        } else {
            return res.status(404).send("item not found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const routeId = req.params.id;
        const result = await Controller.removeEntryById(routeId);
        if (!result || result.status == 404) {
            return res.status(result.status).send("item not found");
        } else {
            return res.send("item deleted successfully");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


export default router;
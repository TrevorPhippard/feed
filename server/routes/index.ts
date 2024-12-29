import express from "express";
import api from "./api";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("/api is working!");
});

router.use("/api", api);

export default router;

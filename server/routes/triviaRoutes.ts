import express from "express";
import { addTrivia, getAllTrivias, getTriviaById, updateTriviaById, removeTriviaByTrivia } from "../controllers/triviaController";

const router = express.Router();

router.route("/editor")
    .get(getAllTrivias)
    .post(addTrivia);

router.route("/editor:id")
    .get(getTriviaById)
    .put(updateTriviaById)
    .delete(removeTriviaByTrivia)

export default router;
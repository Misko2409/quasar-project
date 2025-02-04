import express from "express";
import { getEvents, getPerformers, getUsers } from "../controllers/mockController.js";

const router = express.Router();

router.get("/events", getEvents);
router.get("/performers", getPerformers);
router.get("/users", getUsers);

export default router;

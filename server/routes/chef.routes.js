import express from "express";
import { createChef, getChefs } from "../controllers/chef.controller.js";

const router = express.Router();

router.post("/create-chef", createChef);
router.get("/get-chefs", getChefs);

export default router;

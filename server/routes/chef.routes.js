const express = require("express");
const { createChef, getChefs } = require("../controllers/chef.controller");

const router = express.Router();

router.post("/create-chef", createChef);
router.get("/get-chefs", getChefs);

module.exports = router;


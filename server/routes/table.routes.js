const express = require("express");
const {
  create30Tables,
  CreateTable,
  deleteTableById,
  getTables,
  updateTableById,
  updateTables,
} = require("../controllers/table.controller");

const router = express.Router();

router.post("/create-table", CreateTable);
router.post("/create30Tables", create30Tables);
router.patch("/update-table/:id", updateTableById);
router.patch("/update-tables", updateTables);
router.get("/get-tables", getTables);
router.delete("/delete-table/:id", deleteTableById);

module.exports = router;

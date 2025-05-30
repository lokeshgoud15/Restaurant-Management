import Table from "../models/table.model.js";

export const CreateTable = async (req, res) => {
  const { name, noOfSeats } = req.body;
  if (!name || !noOfSeats) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const tables = await Table.find();
  if (tables.find((table) => table.name === `Table ${name}`)) {
    return res.status(400).json({ message: "Table name already exists" });
  }
  try {
    Table.create({ name: `Table ${name}`, noOfSeats });
    res.status(201).json({ message: "Table created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating table", error });
  }
};

export const create30Tables = async (req, res) => {
  try {
    for (let i = 1; i <= 30; i++) {
      const randomSeats = Math.floor(Math.random() * 7) + 1;
      await Table.create({ name: `Table ${i}`, noOfSeats: randomSeats });
    }
    res.status(200).json({ message: "Tables created successfully" });
  } catch (error) {
    console.error("Error creating tables:", error);
    res.status(500).json({ message: "Error creating tables" });
  }
};

export const deteleTable = async (req, res) => {
  try {
    await Table.deleteMany({});
    res.status(200).json({ message: "Tables deleted successfully" });
  } catch (error) {
    console.error("Error deleting tables:", error);
    res.status(500).json({ message: "Error deleting tables" });
  }
};

export const updateTables = async (req, res) => {
  try {
    const tables = await Table.find();
    tables.forEach((table) => {
      table.noOfSeats = Math.floor(Math.random() * 6) + 2;
      table.save();
    });
    console.log("All tables updated with random noOfSeats");
  } catch (error) {
    console.error("Error updating tables:", error);
  }
};

export const updateTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    table.noOfSeats = req.body.noOfSeats;
    await table.save();
    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Error updating table" });
  }
};

export const deleteTableById = async (req, res) => {
  const tableId = req.params.id;

  try {
    const table = await Table.findById(tableId);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.isOccupied) {
      return res.status(400).json({ message: "Table is currently occupied" });
    }

    await Table.findByIdAndDelete(tableId);

    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ message: "Error deleting table" });
  }
};

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Error fetching tables" });
  }
};

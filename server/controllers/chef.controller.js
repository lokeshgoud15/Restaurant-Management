const Chef = require("../models/chef.model");

const createChef = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await Chef.create({ name, phone, email });
    res.status(201).json({ message: "Chef created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating chef", error });
  }
};

const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chefs", error });
  }
};

module.exports = {
  createChef,
  getChefs,
};

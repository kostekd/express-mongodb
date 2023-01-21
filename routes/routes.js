import express from "express";
import Model from "../models/models.js";
export const router = express.Router();

router.post("/post", (req, res) => {
  console.log(req.body);
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
    console.log("Saved");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error");
  }
});

router.get("/get", async (req, res) => {
  const { name, age } = req.query;
  console.log(name, age);
  try {
    const data = await Model.find({ name: name, age: age });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

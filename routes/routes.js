import express from "express";
import Model from "../models/models.js";
export const router = express.Router();

router.post("/post", (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  const { name, minAge, maxAge } = req.query;
  let query = {
    $and: [{ age: { $gte: minAge } }, { age: { $lte: maxAge } }],
  };
  if (name) {
    query = {
      $and: [
        { name: { $regex: name, $options: "i" } },
        { age: { $gte: minAge } },
        { age: { $lte: maxAge } },
      ],
    };
  }

  try {
    const data = await Model.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import express, { Request } from "express";
import { FilterQuery } from "mongoose";
import Model from "../models/models";
export const router = express.Router();

interface QueryParams {
  name: string;
  minAge: number;
  maxAge: number;
}

interface PostBody {
  name: string;
  age: number;
}

router.post("/post", (req: Request<{}, {}, PostBody>, res) => {
  const { name, age } = req.body;
  const data = new Model({
    name,
    age,
  });

  data.save((err) => {
    if (err) {
      res.status(403).send(err);
    } else {
      res.status(201).send("Data Saved");
    }
  });
});

router.get("/get", async (req: Request<{}, {}, {}, QueryParams>, res) => {
  const { name, minAge, maxAge } = req.query;

  let query: FilterQuery<unknown> = {
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
  } catch ({ message }) {
    res.status(500).json({ message: message });
  }
});

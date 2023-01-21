import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";

dotenv.config();
const mongoString = process.env.DATABASE_URL;
await mongoose
  .connect(mongoString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const database = mongoose.connection;

database.on("error", () => {
  console.log("There has been an error connecting to the database");
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
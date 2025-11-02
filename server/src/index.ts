import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./utils/auth.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
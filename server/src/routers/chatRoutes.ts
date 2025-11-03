import { Router } from "express";
import { isAuthenticated } from "../utils/middleware.js";
import { getStreamToken } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.get("/token", isAuthenticated,getStreamToken)

export default chatRouter;
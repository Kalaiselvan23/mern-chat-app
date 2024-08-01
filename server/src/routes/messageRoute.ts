import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getMessages } from "../controllers/messageController";
const messageRoute=Router();
messageRoute.post("/get-messages",verifyToken,getMessages);
export default messageRoute
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { searchContacts } from "../controllers/contactController";

const contactRoute=Router();
contactRoute.post("/search",verifyToken,searchContacts)

export default contactRoute
import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getContactsForDm, searchContacts } from "../controllers/contactController";

const contactRoute=Router();
contactRoute.post("/search",verifyToken,searchContacts)
contactRoute.get("/get-contacts-for-dm",verifyToken,getContactsForDm)
export default contactRoute
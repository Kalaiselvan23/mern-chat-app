import { Router } from "express";
import { signup,login, getUserInfo, logout} from "../controllers/AuthController";
import { verifyToken } from "../middleware/authMiddleware";
const router=Router();

router.post("/signup",signup);
router.post("/login",login)
router.get("/user-info",verifyToken,getUserInfo)
router.post("/logout",logout);


export default router
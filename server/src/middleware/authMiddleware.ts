import jwt from "jsonwebtoken";
import config from "../configs";
export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.json({
        err: "You are not authenticated",
      });
    jwt.verify(token, config.jwtSecret, async (err: any, payload: any) => {
      if (err) return res.status(403).json({ errr: "Token is invalid" });
      console.log("payload",payload)
      req.email = payload.email;
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

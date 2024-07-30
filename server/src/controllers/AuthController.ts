import { genSalt, hash } from "bcrypt";
import User from "../models/UserModel";
import { generateToken } from "../utils/tokenGenerator";
import { compare } from "bcrypt";
import { maxAge } from "../utils/tokenGenerator";
export const signup = async (req: any, res: any) => {
  console.log("Signing up...");
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({
        err: "Email and password is required",
      });
    }
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    console.log(hashedPassword);
    const user = await User.create({ email, password: hashedPassword });
    const token = generateToken({ email, password: hashedPassword });
    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None",
      withCredentials: true,
    });
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        err: "Email and password is required",
      });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        err: "NO user found",
      });
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).json({
        err: "Password does not match",
      });
    }
    const token = await generateToken({ email, password });
    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getUserInfo = async (req: any, res: any) => {
  console.log(req.email);
  const email = req.email;
  const user = await User.findOne({ email });
  return res.json(user);
};

export const logout = async (req: any, res: any) => {
  try {
    res.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    return res.status(200).json({
      msg: "Logout successfull",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Internal server errror",
    });
  }
};

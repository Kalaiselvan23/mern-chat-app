import {sign} from "jsonwebtoken"
import config from "../configs"
export const maxAge=3*24*60*60*1000;

export const generateToken=({email, password}:{email:string, password:string})=>{
    //generate jwt token with email and password
    return sign({email, password},config.jwtSecret,{expiresIn:maxAge})
}

import dotenv from "dotenv"
dotenv.config();
const config={
    port:8000,
    dbURL:process.env["DB_URL"]!,
    jwtSecret:process.env["JWT_SECRET"]!,
}
export default config
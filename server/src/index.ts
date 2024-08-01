import express from "express";
import mongoose from "mongoose";
import config from "./configs";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import contactRoute from "./routes/contactRoutes";
import { socketSetup } from "./controllers/socket";
import messageRoute from "./routes/messageRoute";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use("/api/auth", authRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/messages",messageRoute)

mongoose.connect(config.dbURL).then(() => {
  console.log("Db connected");
  const server = app.listen(8000, () => {
    console.log("App is listening in 8000");
  });
  console.log('connecting to socket...')
  socketSetup(server);
});

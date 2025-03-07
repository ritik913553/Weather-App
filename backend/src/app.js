import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "isdfhnoifjnoi3294832",
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

import weatherRouter from "./routes/weather.routes.js";
import userRouter from './routes/user.routes.js'

app.use("/api/v1/weather", weatherRouter);
app.use('/api/v1/user',userRouter)

export { app };

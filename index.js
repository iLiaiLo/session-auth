import express from "express";
import dotenv from "dotenv";

import session from "express-session";
import pgSession from "connect-pg-simple";
import cookieParser from "cookie-parser";
import { connectToDb, pool } from "./db/connection.js";
import authRouter from "./routes/authRoutes.js";
import appRouter from "./routes/appRoutes.js";

dotenv.config();

const app = express();
const PgStore = pgSession(session);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use(
  session({
    name: "sessionId",

    store: new PgStore({
      pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 20,
    },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/data", appRouter);

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  })
  .catch((e) => console.log(e));

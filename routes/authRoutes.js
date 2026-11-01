import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;

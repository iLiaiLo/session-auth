import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import greetUser from "../controllers/userData/greetUser.js";

const appRouter = express.Router();

appRouter.get("/", isAuthenticated, greetUser);

export default appRouter;

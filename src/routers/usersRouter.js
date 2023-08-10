import { Router } from "express";
import { currentMiddleware } from "../controllers/profileControllers.js";
import { changeRole } from "../controllers/usersControllers.js";

export const usersRouter = Router();

//Change role status
usersRouter.get("/premium/:uid",currentMiddleware, changeRole);

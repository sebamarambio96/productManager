import { Router } from "express";
import { passRecoveryMail, passRecoveryVerify, sendMail, sendRequestPortfolio } from "../controllers/msgController.js";

export const messagesRouter = Router();

messagesRouter.post("/sendMail", sendMail);

//Password recovery mail
messagesRouter.post("/passRecoveryMail", passRecoveryMail);

//Password recovery validate token
messagesRouter.post("/passRecoveryVerify", passRecoveryVerify);

//Portfolio
messagesRouter.post("/sendMail", sendRequestPortfolio);
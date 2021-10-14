import express from "express";
import * as AuthControler from "../controller";

const authRouter = express.Router();

authRouter.route("/sign").post(AuthControler.sign);

export default authRouter;

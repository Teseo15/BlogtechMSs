import express from "express";
import { DOMAIN, AUTH_PORT } from "../config/config";
import authRouter from "./network";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.listen(AUTH_PORT, () =>
  console.log(`Auth MS on localh ${DOMAIN}:${AUTH_PORT}`)
);

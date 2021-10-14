import express from "express";
import { DOMAIN, AUTH_PORT } from "../config/config";

const app = express();

app.listen(AUTH_PORT, () =>
  console.log(`Auth MS on localh ${DOMAIN}:${AUTH_PORT}`)
);

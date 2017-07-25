
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo"; // (session)
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");

import { Request, Response, NextFunction } from 'express';

import * as homeController from "./controllers/home";

const app = express();
app.use(bodyParser());
let responseBragger = (req:Request, res:Response, next:NextFunction) => {
  res.setHeader("X-Blurg", "definite")
  next()
};
app.use(responseBragger);
app.get("/", homeController.index);
app.get("/dogs", homeController.dogList);
app.post("/dog", homeController.newDog);
app.put("/dog/:name", homeController.pupdate);
app.get("/dog/:name", homeController.hereDog);
app.delete("/dog/:name", homeController.bye);

const port = process.env.PORT || 3000;
 
app.listen(port, () => {
  console.log("Listening on " + port);
});

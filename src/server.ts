
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

interface BraggerOptions {
  header: string
  message: string
}
let bragger = function(opts:BraggerOptions) {
  return (req:Request, res:Response, next:NextFunction) => {
    if (req.method == "GET") {
      res.setHeader(opts.header, opts.message);
    }
    next()
  }
};
app.use(bragger({header:"X-Credibility", message: "complete bollocks"}));
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

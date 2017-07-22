
import { Request, Response } from "express";

/**
 * GET /dogs
 * Main dogs page
 */
export let index = (req: Request, res: Response) => {
  res.contentType('text/plain');
  res.send("Hello");
};

export let newDog =( req: Request, res: Response) => {
  var body = req.body;
  var dog = body.dog; 
   
  console.log("body is : "  + JSON.stringify(body));
  console.log("dog is : "  + dog);
       
  res.contentType('json');
  res.send(JSON.stringify({ status: "success" }));
};
 

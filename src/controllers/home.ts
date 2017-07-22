
import { Request, Response } from "express";

class Dog {
    name : string;
    breed : string;
};

const doggos: {[name:string]:Dog}= {};

export let index = (req: Request, res: Response) => {
  res.contentType('text/plain');
  res.send("Hello");
};

export let newDog = ( req: Request, res: Response) => {
  console.log("body = ", req.body)
  let parsed = req.body;
  let doggo = new Dog();
  doggo.name = parsed.name;
  doggo.breed = parsed.breed;
  console.log(doggo);
  doggos[doggo.name] = doggo;
       
  res.contentType('json');
  res.send(JSON.stringify({ status: "success" }));
};
 
export let dogList = ( req: Request, res: Response) => {
  res.contentType('json');
  res.send(JSON.stringify(doggos));
};

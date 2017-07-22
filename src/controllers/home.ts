
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
  if (!doggo.name || doggos[doggo.name]) {
    res.status(400);
    res.contentType('json');
    let result = {
        status: "failure",
        message: "Doggos need a unique name"
    };
    res.send(JSON.stringify(result));
  }
  doggos[doggo.name] = doggo;
       
  res.setHeader('Location', "http://localhost:3000/dog/" + doggo.name);
  res.status(201);
  res.contentType('json');
  let result = {
      status: "success",
      message: "Good dog, 12/10 would pet"
  };
  res.send(JSON.stringify(result));
};
 
export let dogList = ( req: Request, res: Response) => {
  res.contentType('json');
  res.send(JSON.stringify(doggos));
};


import { Request, Response } from "express";

class Dog {
    name : string;
    breed : string;
};

const doggos: {[name:string]:Dog}= {};

function dogsBody(req: Request) {
  let parsed = req.body;
  let doggo = new Dog();
  doggo.name = parsed.name;
  doggo.breed = parsed.breed;
  return doggo;
}

function unknownDog( res: Response, code:number, err:String = "Doggos need a unique name") {
    res.status(code);
    res.contentType('json');
    let result = {
        status: "failure",
        message: err
    };
    res.send(JSON.stringify(result));
}

function successfulPupdate(res:Response, doggo:Dog, code:number) {
  res.setHeader('Location', "http://localhost:3000/dog/" + doggo.name);
  res.status(code);
  res.contentType('json');
  let result = {
    status: "success",
    message: "Good dog, 12/10 would pet"
  };
  res.send(JSON.stringify(result));
}

export let index = (req: Request, res: Response) => {
  res.render('index', {title: "Home", greeting: "G'day mate"})
};

export let newDog = ( req: Request, res: Response) => {
  let doggo = dogsBody(req);
  if (!doggo.name || doggos[doggo.name]) {
    unknownDog(res, 400);
    return;
  }
  doggos[doggo.name] = doggo;
  successfulPupdate(res, doggo, 201);
};

export let hereDog = ( req: Request, res: Response) => {
  let name = req.params. name;
  if (!name || !doggos[name]) {
    unknownDog(res, 404, "Never sniffed that dog.");
    return;
  }
  res.status(200);
  res.contentType('json');
  res.send(JSON.stringify(doggos[name]));
};

export let pupdate = ( req: Request, res: Response) => {
  let name = req.params.name;
  if (!name || !doggos[name]) {
    unknownDog(res, 404, "Never sniffed that dog");
    return;
  }
  let doggo = dogsBody(req);
  if (!doggo.name) {
    unknownDog(res, 400);
    return;
  }
  if (doggo.name != name) {
      delete doggos[name]; //renamed!
  }
  doggos[doggo.name] = doggo;
  successfulPupdate(res, doggo, 201);
};

export let bye = ( req: Request, res: Response) => {
  let name = req.params.name;
  if (!name || !doggos[name]) {
    unknownDog(res, 404, "Never sniffed that dog");
    return;
  }
  delete doggos[name];
  res.status(200);
  res.contentType('json');
  let result = {
    status: "success",
    message: "until next time good buddy"
  };
  res.send(JSON.stringify(result));
};

export let dogList = ( req: Request, res: Response) => {
  res.contentType('json');
  res.send(JSON.stringify(doggos));
};


import { Request, Response,NextFunction} from "express"

export interface HeaderOptions {
  header: string
  message: string
}

export let HeaderInjector = (opts:HeaderOptions) => {
  return (req:Request, res:Response, next:NextFunction) => {
    if (req.method == "GET") {
      res.setHeader(opts.header, opts.message);
    }
    next()
  }
};
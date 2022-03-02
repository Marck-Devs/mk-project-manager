import { Request, RequestHandler, Response } from "express";

export function apiHandler(req: Request, res: Response, next: any){
  const APIKEY = process.env.APIKEY || "Estafeta";
  const CLIENT_API = req.header("X-API-KEY");
  if(!CLIENT_API){
    res.status(401).end();
    return;
  }
  if(CLIENT_API != APIKEY){
    res.status(401).end();
    return;
  }
  next();
}
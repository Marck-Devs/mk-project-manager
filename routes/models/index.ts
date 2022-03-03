import { Router } from "express";
import { projectRouter } from "./project";

 const modelsRoter = Router();

 modelsRoter.use("/project", projectRouter);


 export {modelsRoter as modelsRouter};
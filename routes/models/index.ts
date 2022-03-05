import { Router } from "express";
import { kanbaRouter } from "./kanba";
import { projectRouter } from "./project";

 const modelsRoter = Router();

 modelsRoter.use("/project", projectRouter);
modelsRoter.use("/kanba", kanbaRouter)

 export {modelsRoter as modelsRouter};
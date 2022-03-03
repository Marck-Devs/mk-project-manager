import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.createProyect);

export  {router as projectRouter};
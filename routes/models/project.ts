import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.createProyect);
router.delete("/:id", models.deleteProject)

export  {router as projectRouter};
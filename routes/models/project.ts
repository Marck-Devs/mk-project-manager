import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.createProyect);
router.delete("/:id", models.deleteProject);
router.post("/:id", models.updateProject);
router.get("/all", models.listProjects);

export  {router as projectRouter};
import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.Project.createProyect);
router.delete("/:id", models.Project.deleteProject);
router.post("/:id", models.Project.updateProject);
router.get("/all", models.Project.listProjects);
router.get("/:id", models.Project.getProject);
router.post("/filter/one", models.Project.getFilterProject);
router.post("/filter/all", models.Project.getFilterListProject);

export  {router as projectRouter};
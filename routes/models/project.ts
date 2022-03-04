import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.createProyect);
router.delete("/:id", models.deleteProject);
router.post("/:id", models.updateProject);
router.get("/all", models.listProjects);
router.get("/:id", models.getProject);
router.post("/filter/one", models.getFilterProject);
router.post("/filter/all", models.getFilterListProject);

export  {router as projectRouter};
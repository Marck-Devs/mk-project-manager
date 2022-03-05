import { Router } from "express";
import { models } from "../../controllers";
let router: Router= Router();

router.put("/", models.Kanba.create);
// router.delete("/:id", models.Project.deleteProject);
router.post("/:id", models.Kanba.update);
router.get("/all", models.Kanba.list);
router.get("/:id", models.Kanba.get);
// router.post("/filter/one", models.Project.getFilterProject);
// router.post("/filter/all", models.Project.getFilterListProject);

export  {router as kanbaRouter};
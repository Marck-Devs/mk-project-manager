import { Router } from "express";
import { dbtools } from "./dbtools";
import { modelsRouter } from "./models";

let router : Router = Router();
router.use(dbtools);
router.use(modelsRouter)
export default router;
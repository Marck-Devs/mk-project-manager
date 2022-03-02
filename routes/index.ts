import { Router } from "express";
import { dbtools } from "./dbtools";

let router : Router = Router();
router.use(dbtools);
export default router;
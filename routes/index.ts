import { Request, Response, Router } from "express";
import { ServerResponse } from "../controllers/models/project";
import { dbtools } from "./dbtools";
import { modelsRouter } from "./models";

let router : Router = Router();
router.use(dbtools);
router.use(modelsRouter)
router.use("*", (req: Request, res: Response)=>{
  let response : ServerResponse = {
    code: 404,
    message: "not found " + req.baseUrl ,
    status: "error"
  }
  res.status(404).json(response);
})
export default router;
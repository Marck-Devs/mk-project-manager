import { Router } from 'express';
import { apiHandler, db } from "../controllers";

let router : Router= Router();

router.put("/setup", apiHandler, db.setup);

export {router as dbtools}
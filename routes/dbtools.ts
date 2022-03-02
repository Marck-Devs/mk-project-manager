import { Router } from 'express';
import { db } from "../controllers";

let router : Router= Router();

router.put("/setup", db.setup);

export {router as dbtools}
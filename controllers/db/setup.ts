import { SimpleLogger } from 'mk-simple-logger';
import { Request, Response } from "express";
import { errorLogger } from '../../helpers/error';
import { KanbanDao, ProjectDao, TaskDao } from '../../models';

export default async function(req: Request, res: Response){
  try{
    await KanbanDao.sync({force: true});
    await ProjectDao.sync({force: true});
    await TaskDao.sync({force: true});
    res.status(201).send("OK");
  }catch(err: any){
    errorLogger(SimpleLogger.global(), err);
    res.status(400).send("ERROR");
  }
}
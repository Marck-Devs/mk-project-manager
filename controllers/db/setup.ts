import { SimpleLogger } from 'mk-simple-logger';
import { database } from './../../db/';
import { Request, Response } from "express";
import { errorLogger } from '../../helpers/error';
import { Kanban, Project, Task } from '../../models';

export default async function(req: Request, res: Response){
  try{
    await Kanban.sync({force: true});
    await Project.sync({force: true});
    await Task.sync({force: true});

  }catch(err: any){
    errorLogger(SimpleLogger.global(), err);
  }
  res.status(201).send("OK");
}
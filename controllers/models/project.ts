import { SimpleLogger } from 'mk-simple-logger';
import { Response } from 'express';
import { Request } from 'express';
import { errorLogger } from '../../helpers/error';
import { ProjectDao } from '../../models';
import { v4 } from 'uuid';

interface ServerResponse{
  status: string;
  code: number;
  message: string;
}

/**
 * Create a new project.
 * Request schema:
 * {
 * *PRNAM: string;             ==  the name of the project
 * ?PRDESC: string;            ==  the description of the project
 * ?PRCODE: string;            ==  the code of the project
 * ?PRHOURS: number;           ==  hours of the project
 * ?PRINITDATE: Date;          ==  the end date of the project
 * ?PRREALHOURS: number;       ==  the init date of the project
 * ?PRPRIORITY: string;        ==  the project's priority of the project
 * ?PRTAGS: string;            ==  the project's tags of the project
 * }
 * @param request {Request}
 * @param response {Response}
 */
export async function createProyect(request: Request, response: Response) {
  const LOG : SimpleLogger = new SimpleLogger("CRE_PROJECT")
  const REQUEST_DATA = request.body;
  let sendResponse: ServerResponse = {
    status: "error",
    code: 400,
    message: "unknow error"
  }
  let status: number = 400;

  try{
    if(!REQUEST_DATA.PRNAM){
      LOG.error("Name not found in request!");
      throw "Name not found"
    }
    REQUEST_DATA.PRID = v4();
    let project = ProjectDao.build(REQUEST_DATA);
    LOG.debug("Data to save: {d}", {d: JSON.stringify(REQUEST_DATA)});
    let pro = await project.save();
    LOG.info("Saved new project");
    status = 201;
    sendResponse.code = status;
    sendResponse.message = pro.toJSON();
    sendResponse.status = "OK";
  }catch(err){
    errorLogger(LOG, err);
    sendResponse.code = status;
    sendResponse.message = (String)(typeof err != "object" ? err: JSON.stringify(err));
    sendResponse.status = "error";
  }
  response.status(status).json(sendResponse);
}


export async function deleteProject(request: Request, response: Response){
  const LOG : SimpleLogger = new SimpleLogger("DEL_PROJECT");
  const PRID : string = request.params.id;
  let sendResp : ServerResponse = {
    status : "error",
    message: "",
    code: 400
  }
  let status = 400;
  try{
    if(!PRID){
      LOG.warn("Project ID not found in request");
      throw "Project ID not found in request";
    }
    let project = await ProjectDao.destroy({where:{
      PRID
    }});
    sendResp = {
      status: "ok",
      code: 202,
      message: "deleted"
    }
    status = 202;
    LOG.info("Deleted {PRID} Total: {project}", {PRID, project});
  }catch(err){
    errorLogger(LOG,err);
    sendResp = {
      status : "error",
      message: (String)(typeof err != "object" ? err: JSON.stringify(err)),
      code: status
    }
  }
  response.status(status).json(sendResp);
}


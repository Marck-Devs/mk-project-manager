import { SimpleLogger } from 'mk-simple-logger';
import { Response } from 'express';
import { Request } from 'express';
import { errorLogger } from '../../helpers/error';
import { ProjectDao } from '../../models';
import { v4 } from 'uuid';

interface ServerResponse {
  status: string;
  code: number;
  message: string;
}

/**
 * Create a new project.
 * @example
 * Request schema:
 * {
 *    *PRNAM: string;           //  ==  the name of the project
 *    ?PRDESC: string;          //  ==  the description of the project
 *    ?PRCODE: string;          //  ==  the code of the project
 *    ?PRHOURS: number;         //  ==  hours of the project
 *    ?PRINITDATE: Date;        //  ==  the end date of the project
 *    ?PRREALHOURS: number;     //  ==  the init date of the project
 *    ?PRPRIORITY: string;      //  ==  the project's priority of the project
 *    ?PRTAGS: string;          //  ==  the project's tags of the project
 * }
 * @param request {Request}
 * @param response {Response}
 */
export async function createProyect(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("CRE_PROJECT")
  const REQUEST_DATA = request.body;
  let sendResponse: ServerResponse = {
    status: "error",
    code: 400,
    message: "unknow error"
  }
  let status: number = 400;

  try {
    if (!REQUEST_DATA.PRNAM) {
      LOG.error("Name not found in request!");
      throw "Name not found"
    }
    REQUEST_DATA.PRID = v4();
    let project = ProjectDao.build(REQUEST_DATA);
    LOG.debug("Data to save: {d}", { d: JSON.stringify(REQUEST_DATA) });
    let pro = await project.save();
    LOG.info("Saved new project");
    status = 201;
    sendResponse.code = status;
    sendResponse.message = pro.toJSON();
    sendResponse.status = "OK";
  } catch (err) {
    errorLogger(LOG, err);
    sendResponse.code = status;
    sendResponse.message = (String)(typeof err != "object" ? err : JSON.stringify(err));
    sendResponse.status = "error";
  }
  response.status(status).json(sendResponse);
}

/**
 * Delete a project
 * url: .../project/:id
 * @param request {Request}
 * @param response {Response}
 */
export async function deleteProject(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("DEL_PROJECT");
  const PRID: string = request.params.id;
  let sendResp: ServerResponse = {
    status: "error",
    message: "",
    code: 400
  }
  let status = 400;
  try {
    if (!PRID) {
      LOG.warn("Project ID not found in request");
      throw "Project ID not found in request";
    }
    let project = await ProjectDao.destroy({
      where: {
        PRID
      }
    });
    sendResp = {
      status: "ok",
      code: 202,
      message: "deleted"
    }
    if (project == 0) {
      status = 404;
      LOG.warn("Project not found");
      throw "not found";
    }
    status = 202;
    sendResp = {
      status: "ok",
      message: "updated",
      code: status
    }
    LOG.info("Deleted {PRID} Total: {project}", { PRID, project });
  } catch (err) {
    errorLogger(LOG, err);
    sendResp = {
      status: "error",
      message: (String)(typeof err != "object" ? err : JSON.stringify(err)),
      code: status
    }
  }
  response.status(status).json(sendResp);
}

/**
 * Update project 
 * url: ../project/:id 
 * @example
 * body:{
 *  ?PRNAM: string;          //   ==  the name of the project
 *  ?PRDESC: string;         //   ==  the description of the project
 *  ?PRCODE: string;         //   ==  the code of the project
 *  ?PRHOURS: number;        //   ==  hours of the project
 *  ?PRINITDATE: DateTime;       //   ==  the end date of the project
 *  ?PRREALHOURS: number;    //   ==  the init date of the project
 *  ?PRPRIORITY: string;     //   ==  the project's priority of the project
 *  ?PRTAGS: string;         //   ==  the project's tags of the project
 * }
 * @param request {Request}
 * @param response {Response}
 */
export async function updateProject(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("UPDATE_PROJECT");
  const PRID = request.params.id;
  const DATA = request.body;
  let sendResp: ServerResponse = {
    code: 400,
    message: "",
    status: "error"
  };
  let status = 400;
  try {
    if (!PRID) {
      LOG.critical("Project id not found in url");
      throw "Project id not found in url";
    }
    if (!DATA) {
      LOG.warn("No body found");
      throw "No body found";
    }
    let result: Array<number> = await ProjectDao.update(DATA, {
      where: {
        PRID
      }
    });
    if (result.length === 0) {
      status = 404;
      LOG.warn("Not found");
      throw "Project not found";
    }
    status = 202
    sendResp = {
      code: status,
      message: "updated",
      status: "ok"
    }
  } catch (error) {
    errorLogger(LOG, error);
    sendResp = {
      code: status,
      message: (String)(typeof error != "object" ? error : JSON.stringify(error)),
      status: "error"
    }
  }
  response.status(status).json(sendResp);
}


export async function listProjects(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("LS_PROJECT");
  LOG.info("Listing...")
  let data = await ProjectDao.findAll();
  response.status(200).json(data);
}

export async function getProject(request: Request, response: Response) {
  const LOG : SimpleLogger = new SimpleLogger("GET_PROJECT");
  const PRID = request.params.id;
  let sendResp: ServerResponse = {
    code: 400,
    message: "",
    status: "error"
  };
  let status: number = 400;
  try{
    if(!PRID){
      LOG.error("No Project id found");
      throw "No Project id found";
    }
    let data = await ProjectDao.findOne({
      where: { PRID }
    });
    let msg = data?.toJSON();
    if(!msg){
      LOG.error("No Project found");
      throw "Project not found";
      status = 404;
    }
    status = 200;
    sendResp = {
      code: status,
      message: msg,
      status: "ok"
    }
  }catch(error){
    errorLogger(LOG, error);
    sendResp = {
      code: status,
      message: (String)(typeof error != "object" ? error : JSON.stringify(error)),
      status: "error"
    }
  }
  response.status(status).json(sendResp);
}

export async function getFilterProject(request: Request ,response: Response){
  const LOG : SimpleLogger = new SimpleLogger("G_FILTER_PROJECT");
  const FILTER = request.body;
  let sendRes: ServerResponse = {
    code: 400,
    message: "",
    status: "error"
  };
  let status : number = 400;

  try{
    let data = await ProjectDao.findOne({
      where: {
        ...FILTER
      }
    });
    let msg = data?.toJSON();
    if(!msg){
      LOG.error("No Project found");
      throw "Project not found";
      status = 404;
    }
    status = 200;
    sendRes = {
      code: status,
      message: msg,
      status: "ok"
    }
  }catch(error){
    errorLogger(LOG, error);
    sendRes = {
      code: status,
      message: (String)(typeof error != "object" ? error : JSON.stringify(error)),
      status: "error"
    }
  }
  response.status(status).json(sendRes);
}
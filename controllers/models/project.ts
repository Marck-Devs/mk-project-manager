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
export function createProyect(request: Request, response: Response) {
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
    project.save();
    LOG.info("Saved new project");
  }catch(err){
    errorLogger(LOG, err);
    sendResponse.code = status;
    sendResponse.message = (String)(typeof err != "object" ? err: JSON.stringify(err));
    sendResponse.status = "error";
  }
}
import { Request, Response } from "express";
import { SimpleLogger } from "mk-simple-logger";
import { v4 } from "uuid";
import { errorLogger } from "../../helpers/error";
import { KanbanDao } from "../../models";
import { ServerResponse } from "./project";

export async function get(req: Request, res: Response) {
  const LOG: SimpleLogger = new SimpleLogger("GET_KANBAN");
  const KAID = req.params.id;
  let sendResp: ServerResponse = {
    code: 400,
    message: "",
    status: "error"
  };
  let status: number = 400;
  try {
    if (!KAID) {
      LOG.error("No Kanban id found");
      throw "No Kanban id found";
    }
    let data = await KanbanDao.findOne({
      where: { KAID }
    });
    let msg = data?.toJSON();
    if (!msg) {
      LOG.error("No Kanban found");
      throw "Kanban not found";
      status = 404;
    }
    status = 200;
    sendResp = {
      code: status,
      message: msg,
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
  res.status(status).json(sendResp);
}

export async function create(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("CRE_KANBAN")
  const REQUEST_DATA = request.body;
  let sendResponse: ServerResponse = {
    status: "error",
    code: 400,
    message: "unknow error"
  }
  let status: number = 400;

  try {
    if (!REQUEST_DATA.KANAME) {
      LOG.error("Name not found in request!");
      throw "Name not found"
    }
    if (!REQUEST_DATA.KAPRID) {
      LOG.error("Project id not found in request!");
      throw "Project id not found"
    }
    REQUEST_DATA.KAID = v4();
    let kanban = KanbanDao.build(REQUEST_DATA);
    LOG.debug("Data to save: {d}", { d: JSON.stringify(REQUEST_DATA) });
    let kan = await kanban.save();
    LOG.info("Saved new Kanban");
    status = 201;
    sendResponse.code = status;
    sendResponse.message = kan.toJSON();
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
 * Delete a kanba
 * url: .../kanba/:id
 * @param request {Request}
 * @param response {Response}
 */
export async function del(request: Request, response: Response) {
  const LOG: SimpleLogger = new SimpleLogger("DEL_KANBAN");
  const KAKID: string = request.params.id;
  let sendResp: ServerResponse = {
    status: "error",
    message: "",
    code: 400
  }
  let status = 400;
  try {
    if (!KAKID) {
      LOG.warn("Kanba ID not found in request");
      throw "Kanba ID not found in request";
    }
    let kanban = await KanbanDao.destroy({
      where: {
        PRID: KAKID
      }
    });
    sendResp = {
      status: "ok",
      code: 202,
      message: "deleted"
    }
    if (kanban == 0) {
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
    LOG.info("Deleted {PRID} Total: {project}", { PRID: KAKID, project: kanban });
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

export async function list(req: Request, res: Response) {
  let data = await KanbanDao.findAll();
  res.status(200).json(data);
}

export async function update(req: Request, res: Response) {
  const LOG: SimpleLogger = new SimpleLogger("UP_KANBA");
  const KAID = req.params.id;
  const DATA = req.body;
  let sendResp: ServerResponse = {
    status: "error",
    message: "",
    code: 400
  }
  let status = 400;
  try {
    if (!KAID) {
      LOG.error("Not found kanba id");
      throw "Not found kanba id";
    }
    let afect: Array<number> = await KanbanDao.update(DATA, {
      where: { KAID }
    });
    if (afect.length == 0) {
      status = 404;
      sendResp = {
        status: "error",
        code: status,
        message: "Not found"
      }
      throw "Not found"
    }
    status = 202;
    sendResp = {
      status: "ok",
      code: status,
      message: "updated"
    }
  } catch (error) {
    errorLogger(LOG, error);
    sendResp = {
      code: status,
      message: (String)(typeof error != "object" ? error : JSON.stringify(error)),
      status: "error"
    }
  }
  res.status(status).json(sendResp);
}
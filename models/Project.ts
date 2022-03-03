import { DataTypes } from "sequelize";
import { database } from "../db";

let ProjectDao = database.define("Project", {
  PRID: {type: DataTypes.TEXT, allowNull: false, primaryKey: true},
  PRNAM: {type: DataTypes.TEXT},
  PRDESC: {type: DataTypes.TEXT},
  PRCODE: {type: DataTypes.TEXT},
  PRHOURS: {type: DataTypes.NUMBER},
  PRREALHOURS: {type: DataTypes.NUMBER},
  PRENDDATE: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  PRINITDATE: {type: DataTypes.DATE},
  PRPRIORITY: {type: DataTypes.TEXT},
  PRTAGS: {type: DataTypes.TEXT}
})

/**
 * Project Data Access Object
 */
export {ProjectDao};

/**
 * @property PRID the id of the project
 * @property PRNAM the name of the project
 * @property PRDESC the description of the project
 * @property PRCODE the code of the project
 * @property PRHOURS hours of the project
 * @property PRREALHOURS real hours of the project
 * @property PRENDDATE the end date of the project
 * @property PRINITDATE the init date of the project
 * @property PRPRIORITY the project's priority of the project
 * @property PRTAGS the project's tags of the project
 */
 export interface Project {
  PRID: string;
  PRNAM: string;
  PRDESC: string;
  PRCODE: string;
  PRHOURS: number;
  PRENDDATE: Date;
  PRINITDATE: Date;
  PRREALHOURS: number;
  PRPRIORITY: string;
  PRTAGS: string;
}

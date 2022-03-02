import { DataTypes } from "sequelize";
import { database } from "../db";

let Project = database.define("Project", {
  PRID: {type: DataTypes.TEXT, allowNull: false, primaryKey: true},
  PRNAM: {type: DataTypes.TEXT},
  PRDESC: {type: DataTypes.TEXT},
  PRCODE: {type: DataTypes.TEXT},
  PRHOURS: {type: DataTypes.TEXT},
  PRENDDATE: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  PRINITDATE: {type: DataTypes.DATE},
  PRPRIORITY: {type: DataTypes.TEXT},
  PRTAGS: {type: DataTypes.TEXT}
})

/**
 * Project Data Access Object
 */
export {Project};
import { DataTypes } from 'sequelize';
import { Kanban, Project } from '.';
import { database } from "../db";

let Task = database.define("Task", {
  TAID: {type: DataTypes.TEXT, primaryKey: true},
  TANAME: {type: DataTypes.TEXT},
  TADESC: {type: DataTypes.TEXT},
  TAHOURS: {type: DataTypes.TEXT},
  TAENDDATE: {type: DataTypes.DATE},
  TAINITDAT: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
  TATAG: {type: DataTypes.TEXT},
  TABODY: {type: DataTypes.TEXT},
  TAPRIORITY: {type: DataTypes.TEXT},
  TADONE: {type: DataTypes.BOOLEAN, defaultValue: false},
  TAKAID: {type: DataTypes.TEXT, references:{
    key: "KAID",
    model: Kanban
  }},
  TAKACOL: {type: DataTypes.NUMBER, defaultValue: 0},
  TAPRID: {references: {
    model: Project,
    key: "PRID"
  }, type: DataTypes.TEXT}
})

export {Task}
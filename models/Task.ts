import { DataTypes } from 'sequelize';
import { KanbanDao, ProjectDao } from '.';
import { database } from "../db";

let TaskDao = database.define("Task", {
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
    model: KanbanDao
  }},
  TAKACOL: {type: DataTypes.NUMBER, defaultValue: 0},
  TAPRID: {references: {
    model: ProjectDao,
    key: "PRID"
  }, type: DataTypes.TEXT}
})

export {TaskDao}

/**
 * @property TAID the task's id
 * @property TANAME the task's name
 * @property TADESC the task's description
 * @property TAHOURS the task's hours
 * @property TAENDDATE the task's end date
 * @property TAINITDAT the task's init date
 * @property TATAG the task's tags
 * @property TABODY the task's body
 * @property TAPRIORITY the task's priority
 * @property TADONE if task is done or not
 * @property TAKAID the task's kanban id 
 * @property TAKACOL the task's kanban col index
 * @property TAPRID the task's project id
 */
export interface Task{
  TAID: string;
  TANAME: string;
  TADESC: string;
  TAHOURS: string;
  TAENDDATE: Date;
  TAINITDAT: Date;
  TATAG: string;
  TABODY: string;
  TAPRIORITY: string;
  TADONE: boolean;
  TAKAID: string;
  TAKACOL: number;
  TAPRID: string;
}
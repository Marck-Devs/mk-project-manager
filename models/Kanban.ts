import { DataTypes } from 'sequelize';
import { database } from "../db";

let KanbanDao = database.define("Kanban", {
  KAID: { type: DataTypes.TEXT, primaryKey: true},
  KANAME: {type: DataTypes.TEXT},
  KADESC: {type: DataTypes.TEXT},
  KACOLS: {type: DataTypes.TEXT}  
})


export {KanbanDao};

/**
 * @property KAID the kanban's id
 * @property KANAME the kanban's name
 * @property KADESC the kanban's description
 * @property KACOLS the kanban's cols
 */
export interface Kanban{
  KAID: string
  KANAME: string;
  KADESC: string;
  KACOLS: string;
}
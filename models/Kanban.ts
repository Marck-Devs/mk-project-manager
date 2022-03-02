import { DataTypes } from 'sequelize';
import { database } from "../db";

let Kanban = database.define("Kanban", {
  KAID: { type: DataTypes.TEXT, primaryKey: true},
  KANAME: {type: DataTypes.TEXT},
  KADESC: {type: DataTypes.TEXT},
  KACOLS: {type: DataTypes.TEXT}  
})


export {Kanban};
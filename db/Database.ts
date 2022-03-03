import { SimpleLogger } from 'mk-simple-logger';
import { Sequelize } from "sequelize";

const logger = new SimpleLogger("ORM");
let database = new Sequelize({
  dialect: "sqlite",
  logging: (...msg) =>{ try{logger.info(msg[0])}catch(err){}},
  storage: process.env.DB_PATH || "./database.sqlite",
});

export {database};

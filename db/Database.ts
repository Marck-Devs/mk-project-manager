import { SimpleLogger } from 'mk-simple-logger';
import { Sequelize } from "sequelize";

const logger = new SimpleLogger("ORM");
let database = new Sequelize({
  dialect: "sqlite",
  logging: (...msg) => logger.info(msg[0]),
  storage: process.env.DB_PATH || "./database.sqlite",
});

export {database};

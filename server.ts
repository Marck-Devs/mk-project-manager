import {SimpleLogger, logger}  from "mk-simple-logger";
import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
const app = express();

// TODO: delete this
process.env.ENVIROMENT = "dev";

// ----[ ENV SETUP ]----
switch (process.env.ENVIROMENT) {
  case "prod":
  case "production":
    dotenv.config();
    SimpleLogger.setLogLevel("warn");
    break;
  case "develop":
  case "dev":
  case "development":
    dotenv.config({ path: __dirname + "/dev.env" });
    SimpleLogger.setLogLevel("debug");
    break;
}

// middlewares for general use 
// ----[ PLUGINS ]----
app.use(logger("SERVER", "info", "{method} {url} - {status} {time}ms"));
app.use(express.json());
app.use(express.urlencoded());

// logger config
// ----[ LOG CONF ]----
SimpleLogger.setDateFormat("[{day}-{month}-{year}] - [ {hour}:{min}:{sec} ]");
SimpleLogger.setFormat("{date} - [ {level} ] - [ {name} ] - {msg}");
SimpleLogger.global().setName("APP");

// ----[ ROUTES ]----
app.use(routes);


// ----[ SERVER INIT ]----
let server = app.listen(process.env.PORT || 8080, ()=>{
  SimpleLogger.global().info("Set up on port: {port}", {port: process.env.PORT || 8080});
})
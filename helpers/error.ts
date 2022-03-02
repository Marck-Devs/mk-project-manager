import { SimpleLogger } from 'mk-simple-logger';
/**
 * 
 * @param logger {SimpleLogger} the logger 
 * @param error {any}
 * @param level {string} the error level [warn| error | critical]
 */
export function errorLogger(logger: any, error: any, level: string = "error") {
  switch (typeof error) {
    case "string":
      logger[level](error);
      break;
    case "object":
      if (error.response && error.response.data) {
        logger[level]((typeof error.response.data != "object" ??
          JSON.stringify(error.response.data, null, 2)));
        return;
      }
      if (error.message) {
        logger[level]((typeof error.message != "object" ??
          JSON.stringify(error.message, null, 2)));
        return;
      }
      logger[level](JSON.stringify(error, null, 2))
      break;
  }
}
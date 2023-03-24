import bodyParser from "body-parser";
import dbSequelize from "config/database";
import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes";

const environment = process.env.NODE_ENV;

dbSequelize.authenticate().then(() => {
  if (environment !== "test") {
    console.log(`connection to ${environment}-db authenticated`);
  }
});

dbSequelize.sync().then(() => {
  if (environment !== "test") {
    console.log(`connected to ${environment}-db`);
  }
});

const createServer = () => {
  const app: Application = express();

  app.use(bodyParser.json());

  app.get("/", (request: Request, response: Response, next: NextFunction) => {
    response.json({ message: "Hello World" });
  });

  app.use(routes);

  return app;
};

export default createServer;

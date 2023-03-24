import { Options, Sequelize } from "sequelize";

let database: string;
let username: string;
let password: string;
let options: Options;

if (process.env.NODE_ENV === "test") {
  database = "app";
  username = "";
  password = "";
  options = {
    storage: ":memory:",
    dialect: "sqlite",
    logging: false,
  };
} else {
  database = "app";
  username = "";
  password = "";
  options = {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
  };
}

const dbSequelize = new Sequelize(database, username, password, options);

export default dbSequelize;

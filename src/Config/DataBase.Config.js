import { Sequelize } from "@sequelize/core";
import chalk from "chalk";

const dbName = process.env[`API_DB_NAME`];
const userName = process.env[`API_DB_USER`];
const userPassword = process.env[`API_DB_USER_PASSWORD`];
const hostName = process.env[`API_DB_HOST`];
const ssl = process.env[`SSL`] === "true";

const sequelize = new Sequelize(dbName, userName, userPassword, {
  host: hostName,
  dialect: "postgres",
  dialectOptions: {
    ssl,
  },
  logging: (message) => console.log(chalk.cyan(message, "\n\n")),
});

export default sequelize;

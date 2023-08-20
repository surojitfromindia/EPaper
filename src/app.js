import chalk from "chalk";
// import the express app from APIServer.js
import APIServer from "./APIServer.js";
import AuthServer from "./AuthServer.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__baseDir = __dirname;

// then call listen method
APIServer.listen(5000, () => {
  console.log(chalk.green("Listening on port 5000"));
});

AuthServer.listen(5010, () => {
  console.log(chalk.green("Auth server is running at port 5010"));
});

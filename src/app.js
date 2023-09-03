import chalk from "chalk";
import "dotenv/config.js";

// import the express app from APIServer.js
import APIServer from "./APIServer.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__baseDir = __dirname;

// then call listen method
APIServer.listen(5000, () => {
  console.log(chalk.green("Listening on port 5000"));
});

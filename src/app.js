import chalk from 'chalk'
// import the express app from ExpressServer.js
import ExpressApp from "./ExpressServer.js"
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__baseDir = __dirname


// then call listen method
ExpressApp.listen(5000, () => {
    console.log(chalk.green("Listening on port 5000"));

})
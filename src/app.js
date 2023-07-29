import chalk from 'chalk'
// import the express app from ExpressServer.js
import ExpressApp from "./ExpressServer.js"


// then call listen method
ExpressApp.listen(5000, () => {
    console.log(chalk.green("Listening on port 5000"));

})
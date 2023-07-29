import {Sequelize} from '@sequelize/core';
import chalk from 'chalk';


const sequelize = new Sequelize('mydb', 'surojit', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: (mesg) => console.log(chalk.cyan(mesg, "\n\n")),
});


export default sequelize;
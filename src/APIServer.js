// here I export an express server
import Express, {json} from 'express';
import v1Router from './routes/v1/index.js';
import {errorHandlerMiddleware} from "./Errors/errorHandlerMiddleware.js";


const expressApp = Express();
expressApp.use(json());
expressApp.use('/v1', v1Router);
expressApp.use(errorHandlerMiddleware)
// await sequelize.sync({force: false, alter: true});


export default expressApp;

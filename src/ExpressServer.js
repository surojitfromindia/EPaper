// here i export an express server
import Express, { json } from 'express';
import sequelize from './Config/DataBase.Config.js';
import v1Router from './routes/v1/index.js';


const expressApp = Express();
expressApp.use(json());
expressApp.use('/v1', v1Router);
await sequelize.sync({ force: true });


export default expressApp;

// here I export an express server
import Express, {json} from 'express';
import sequelize from './Config/AuthDataBase.Config.js';
import v1Router from './Auth/routes/v1/index.js';


const expressApp = Express();
expressApp.use(json());
expressApp.use('/v1/accounts', v1Router);
await sequelize.sync({force: true});


export default expressApp;

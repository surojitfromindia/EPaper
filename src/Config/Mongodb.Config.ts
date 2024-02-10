import mongoose from "mongoose";
import * as process from "process";

const hostName = process.env[`MONGO_DB_HOST`];
const dbName = process.env[`MONGO_DB_NAME`];
const userName = process.env[`MONGO_DB_USER`];
const userPassword = process.env[`MONGO_DB_USER_PASSWORD`];
const port = process.env[`MONGO_DB_PORT`];
const userAndPassword =
  process.env[`MONGO_DB_USER_PASSWORD`] +
  ":" +
  process.env[`MONGO_DB_USER_PASSWORD`];

const connectionString = `mongodb://${hostName}:${port}/${dbName}`;

mongoose.connect(connectionString).then(() => {
  console.log("Mongodb connected successfully");
});

export default mongoose.connection;

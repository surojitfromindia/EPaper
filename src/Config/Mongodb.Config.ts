import mongoose from "mongoose";
import * as process from "process";

const hostURL = process.env[`MONGO_DB_URL`];
const dbName = process.env[`MONGO_DB_NAME`];
const userName = process.env[`MONGO_DB_USER`];
const userPassword = process.env[`MONGO_DB_USER_PASSWORD`];
const port = process.env[`MONGO_DB_PORT`];
const userAndPassword =
  process.env[`MONGO_DB_USER_PASSWORD`] +
  ":" +
  process.env[`MONGO_DB_USER_PASSWORD`];

const connectionString = `mongodb+srv://${hostURL}`;

mongoose.connect(connectionString).then(() => {
  console.log("Mongodb connected successfully");
});

export default mongoose.connection;

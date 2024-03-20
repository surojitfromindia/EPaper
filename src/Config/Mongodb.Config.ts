import mongoose from "mongoose";
import * as process from "process";

const host = process.env[`MONGO_DB_HOST`];
const protocol = process.env[`MONGO_PROTOCOL`];


const connectionString = `${protocol}://${host}`;

mongoose.connect(connectionString).then(() => {
  console.log("Mongodb connected successfully");
});

export default mongoose.connection;

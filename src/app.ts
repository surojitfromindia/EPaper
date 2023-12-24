import "dotenv/config";

// import the express app from APIServer
import APIServer from "./APIServer";
import * as process from "process";

// then call listen method
APIServer.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT + "...");
});

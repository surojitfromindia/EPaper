import "dotenv/config";

// import the express app from APIServer
import APIServer from "./APIServer";

// then call listen method
APIServer.listen(5020, () => {
  console.log("Listening on port 5000");
});

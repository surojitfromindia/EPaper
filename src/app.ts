import "dotenv/config";

// import the express app from APIServer
import APIServer from "./APIServer";

// then call listen method
APIServer.listen(5000, () => {
  console.log("Listening on port 5000");
});

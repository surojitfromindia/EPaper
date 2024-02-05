import { createClient } from "redis";

const redis = createClient({
  password: process.env["REDIS_PASSWORD"],
  socket: {
    host: process.env["REDIS_HOST"],
    port: Number(process.env["REDIS_PORT"]),
  },
});

(async () => {
  await redis.connect().then(() => {
    console.log("Redis connected successfully");
  });
})();

export default redis;

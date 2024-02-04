import { createClient } from "redis";

const redis = createClient({
  url: process.env["REDIS_URL"],
});

(async () => {
  await redis.connect().then(() => {
    console.log("Redis connected successfully");
  });
})();

export default redis;

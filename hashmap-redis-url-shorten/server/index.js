import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { encodeBase62 } from "./services/base_62_encoding_service.js";

const app = express();

app.use(cors());
app.use(express.json());

// initialise redis
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

redisClient.on("error", () => {
  console.log("Redis Connection Failed");
});

// shorten a long url
app.post("/shorten", async (req, res) => {
  const originalURL = req.body["originalURL"];
  console.log(req.body);

  if (!originalURL) {
    res.json({
      status: false,
      error: "Please pass the Long URL",
    });
  } else {
    try {
      const id = await redisClient.incr("global_counter");
      console.log(id);
      const shortUrlId = encodeBase62(id);
      console.log(shortUrlId);

      await redisClient.hSet("urls", shortUrlId, originalURL);

      res.json({
        status: true,
        data: "https://microurl.com/" + shortUrlId,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        error: error,
      });
    }
  }
});

// get a long url from short url
app.get("/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const originalUrl = await redisClient.hGet("urls", shortUrlId);
  res.json({
    status: true,
    data: originalUrl,
  });
});

app.listen(3001, async () => {
  try {
    await redisClient.connect();
    console.log("Backend is running");
  } catch (error) {
    console.log(error);
  }
});

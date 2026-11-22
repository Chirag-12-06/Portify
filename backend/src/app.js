import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://chirag-gupta-portfolio.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

export default app;

import "dotenv/config";
import cors from "cors";
import express from "express";

import { env } from "./env.js";
import { V1Router } from "./routes/v1/index.js";

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);

// routers
app.use("/api/v1", V1Router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

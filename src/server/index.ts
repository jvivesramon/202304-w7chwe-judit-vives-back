import cors from "cors";
import express from "express";
import morgan from "morgan";
import { notFoundError } from "./middleware/notFoundError/notFoundError.js";
import { generalError } from "./middleware/generalError/generalError.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-judit-vives-front.netlify.app",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(corsOptions));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(notFoundError);

app.use(generalError);

export default app;

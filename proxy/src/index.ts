require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import hasuraProxy from "./hasuraProxy";
import jwtCheck from "./jwtCheck";
import authRouter from "./routes/auth";
import imageKitRouter from "./routes/imageKit";

const app = express();

app.use(cors());

app.use((err: any, req: any, res: any, next: any) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

app.use("/graphql", jwtCheck, hasuraProxy);

app.use("/imageKit", imageKitRouter);

app.use("/auth", bodyParser.json(), authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

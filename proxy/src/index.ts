require("dotenv").config();
import express from "express";
import hasuraProxy from "./hasuraProxy";

const app = express();

app.use("/graphql", hasuraProxy);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

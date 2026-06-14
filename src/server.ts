import express from "express";
import db = require("./db/db");

const app = express();

app.get("/", async (_, res) => {
  try {
    await db.db.query("SELECT 1");

    res.send("Database Connected");
  } catch (error) {
    console.error(error);

    res.send("Database Not Connected");
  }
});

app.listen(5000, () => {
  console.log("Server Running");
});
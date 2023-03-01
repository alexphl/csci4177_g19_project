"use strict";

import express from "express";

const app = express();

app.get("/api/test", (req, res) => {
  const response = `Hello World!`;
  res.send(response);
});

app.get("/api/test2", (req, res) => {
  const response = `test2`;
  res.send(response);
});

export default app;

"use strict";

import createError from "http-errors";
import express, { json as _json, urlencoded, static as _static } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connect, set, connection } from "mongoose";

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_URL}`;
connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
set("strictQuery", true);

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected Successfully");
});

import indexRouter from "./routes/index";
import accountRouter from "./routes/account";
import customerRouter from "./routes/customer";
import transactionRouter from "./routes/transaction";

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(_json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(_static(join(__dirname, "public")));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'https://scintillating-toffee-28fea0.netlify.app');
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use("/api/", indexRouter);
app.use("/api/account", accountRouter);
app.use("/api/customer", customerRouter);
app.use("/api/transaction", transactionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

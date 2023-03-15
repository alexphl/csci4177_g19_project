"use strict";

import createError from "http-errors";
import express, { urlencoded, static as _static } from "express";
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

app.use(logger("dev"));
app.use(
  urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(_static(join(__dirname, "public")));

// Add headers before the routes are defined
app.use(function (_req, res, next) {
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


// IMPORT ROUTES START ------------------------------

import indexRouter from "@/utils/routes/index";
import accountRouter from "@/utils/routes/account";
import customerRouter from "@/utils/routes/customer";
import transactionRouter from "@/utils/routes/transaction";
import stocksRouter from "@/utils/routes/stocks";
import userRouter from "@/utils/routes/userRoutes";
import authRouter from "@/utils/routes/authRoutes";

app.use("/api/", indexRouter);
app.use("/api/account", accountRouter);
app.use("/api/customer", customerRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/stocks/", stocksRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// IMPORT ROUTES END --------------------------------


// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error status
  res.status(err.status || 500);
});

export default app;

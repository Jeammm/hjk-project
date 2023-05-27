const express = require("express");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

const app = express();

//set security for http headers
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  wondowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

//body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//data sanitiztion against XSS
app.use(xss());

//enable cors
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(compression());

app.use(cookieParser());

//routes
app.use("/api/v1", productRouter);
app.use("/api/v1/user", userRouter);

//error middleware routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController);

module.exports = app;

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');


//set security for http headers
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  wondowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//data sanitiztion against XSS
app.use(xss());

//enable cors
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(compression());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api/v1", productRouter);
app.use("/api/v1/user", userRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message, '💥');
  console.error('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message, '💥');
  console.error('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

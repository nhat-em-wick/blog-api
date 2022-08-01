const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const routerV1 = require("./api/v1/routes");

require("./config/dbConfig");

app.use(express.json());
app.use(cors());
routerV1(app);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`Server start on port: ${port}`);
});

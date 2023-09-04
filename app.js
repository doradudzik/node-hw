const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const publicPath = path.join(__dirname, "public");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/config-passport");

app.use(express.static(publicPath));
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const index = require("./routes");
require("./database");
const errorHandler = require("errorhandler");

const port = process.env.PORT || 3000;

const app = express();
// exports.app = app;
module.exports = app;

require("./config/session.config");
require("./config/passport.config");

app.set("views", path.join(__dirname, "views")); // par défaut, mais soyons explicite
app.set("view engine", "pug"); // définir l'extension par défaut utilisée par notre engine

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use(index); //le middleware pour les routes

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}

// app.listen(port);

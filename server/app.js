const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const db_config = require("./db/dbconfig");

const pool = mysql.createPool({
  host: db_config.host,
  port: 3306,
  database: db_config.database,
  user: db_config.user,
  password: db_config.password,
  multipleStatements: true,
  connectionLimit: 150,
  multipleStatements: true
});

/*
var connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function(err) {
    // The server is either down
    // or restarting (takes a while sometimes).
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
      // We introduce a delay before attempting to reconnect,
      // to avoid a hot loop, and to allow our node script to
      // process asynchronous requests in the meantime.
      // If you're also serving http, display a 503 error.
    } else {
      console.log("mysqlDB server is connected");
    }
  });

  connection.on("error", function(err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("DB error: ", err);
      handleDisconnect();
    } else {
      throw err;
    }
    // Connection to the MySQL server is usually
    // lost due to either server restart, or a
    // connnection idle timeout (the wait_timeout
    // server variable configures this)
  });
}
handleDisconnect();
*/

//connect vue router
app.use(require("connect-history-api-fallback")());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();
const routes = require("./routes");
routes(router, pool);
app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

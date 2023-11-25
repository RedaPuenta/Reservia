const errorHandler = require("errorhandler");
const compression = require("compression");
const express = require("express");
const serveStatic = require("serve-static");
const morgan = require("morgan");
const lusca = require("lusca");
const path = require("path");
const port = process.env.PORT || 8080;

const app = express();
app.set("env", "production");
app.set("x-powered-by", "RB");
app.use(compression({ threshold: 32 }));
app.use(
  serveStatic(`${__dirname}`, {
    index: false,
    maxAge: "30d",
  })
);
app.use(morgan("combined"));
app.use(
  lusca({
    xframe: "SAMEORIGIN",
    xssProtection: true,
  })
);
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.listen(port);

const express = require("express");

var index = require("./routes/index");

const app = express(),
      port = 3000;

app.set("view engine", "ejs");

app.use("/", index);


app.listen(port, () => {
    console.log("Express app listening at http://localhost:%s", port);
});

module.exports = app;

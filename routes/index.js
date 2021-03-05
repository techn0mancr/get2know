const express = require("express"),
      router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, world!");
    console.log("Someone connected to the server!");
});

module.exports = router;

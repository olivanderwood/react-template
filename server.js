const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.get("/", (req, res) => {
  app.use(express.static(__dirname + "/build"));
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

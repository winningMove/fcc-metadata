var express = require("express");
var cors = require("cors");
require("dotenv").config();
var multer = require("multer");
const upload = multer({ dest: "./uploads/" });

var app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Private-Network", true);
  next();
}, cors({ optionsSuccessStatus: 200 }));
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

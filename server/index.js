const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3005;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  }
);

const db = mysql.createConnection({
  user: "b03d5e40506bff",
  host: "us-cdbr-east-05.cleardb.net",
  password: "0268d591",
  database: "heroku_3ebec310b51ec4a",
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM aaa_data", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

setInterval(function () {
  db.query("SELECT 1");
}, 5000);

app.listen(process.env.PORT || PORT, () => {
  console.log(`running server on ${PORT}`);
});

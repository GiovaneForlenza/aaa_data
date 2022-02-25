const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = 3001;

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
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Controll-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }
);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/getHistory", (req, res) => {
  db.query(
    "SELECT * FROM aaa_data ORDER BY id DESC LIMIT 50",
    (error, rows) => {
      if (error) throw error;
      res.send(rows);
    }
  );
});

app.post("/getRequests", (req, res) => {
  db.query(`SELECT state_name FROM aaa_data`, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/add", (req, res) => {
  const membership = req.body.membership;
  const memb1 = membership.substring(0, 3);
  const memb2 = membership.substring(3, 6);
  const zipcode = req.body.zipcode;
  const stateName = req.body.stateName;
  const requestType = req.body.requestType;
  console.log(stateName);
  db.query(
    "INSERT INTO heroku_3ebec310b51ec4a.aaa_data (club_code_1,club_code_2,zipcode,state_name, service_type) VALUES (?,?,?,?,?);",
    [memb1, memb2, zipcode, stateName, requestType],
    (err, res) => {
      if (err) console.log(err);
    }
  );
});

setInterval(function () {
  db.query("SELECT 1");
}, 5000);

app.listen(process.env.PORT || PORT, '0.0.0.0', () => {
  console.log(`running server on ${PORT}`);
});

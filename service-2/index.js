const http = require("http");
const express = require("express");
const session = require("express-session");

const {json, urlencoded} = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({extended: true}));

const keycloak = require("./keycloak-config").initKeycloak();

app.use(keycloak.middleware());

app.get("/generate-new-animal-protect", keycloak.protect("user"), (req, res) => {
  res.status(200).send("new animal");
});

app.get("/generate-new-animal-enforcer", keycloak.enforcer("animals:view"), (req, res) => {
  res.status(200).send("new animal");
});

const server = http.createServer(app);

server.listen(9002, () => {
  console.log(`SERVICE-2 is listening on port ${9002}`);
});

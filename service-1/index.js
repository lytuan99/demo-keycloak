const http = require("http");
const express = require("express");
const session = require("express-session");

const {json, urlencoded} = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const {default: axios} = require("axios");

const app = express();
const memoryStore = new session.MemoryStore();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({extended: true}));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const SERVICE2_DOMAIN = 'http://localhost:9002';
const keycloak = require("./keycloak-config").initKeycloak(memoryStore);

app.use(keycloak.middleware({logout: '/none', admin: '/none'}));

// app.get("/animals", keycloak.enforcer("animals:view", { response_mode: 'token'}), async (req, res) => {
//   res.send({status: 1, result: ["cat", "dog", "fish"]});
// });

app.get("/animals", keycloak.enforcer(["animals:get"]), async (req, res) => {
  console.log('success verify: ', req.accessTokenContent);

  const { verifyType } = req.query;
  const animals = ["cat", "dog", "fish"];
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const {data} = await axios({
      method: "GET",
      url: `${SERVICE2_DOMAIN}/generate-new-animal-${verifyType}`,
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    animals.push(data);
  } catch (error) {}
  res.send({status: 1, result: animals});
});

app.post("/animals", keycloak.enforcer(["animals:post"]), async (req, res) => {
  const animals = ["post cat", "post dog", "post fish"];
  res.send({status: 1, result: animals});
});

app.put("/animals", keycloak.enforcer(["animals:put"]), async (req, res) => {
  const animals = ["kitty", "puppy", "fishy"];
  res.send({status: 1, result: animals});
});

app.delete("/animals", keycloak.enforcer(["animals:delete"]), async (req, res) => {
  const animals = ["cat", "dog"];
  res.send({status: 1, result: animals});
});




app.get("/admin", keycloak.protect("admin"), (req, res) => {
  res.send({status: 1, result: "I am admin"});
});

app.get("/user", keycloak.protect("user"), (req, res) => {
  res.send({status: 1, result: "I am user"});
});

app.post("/logout", (req, res) => {
  console.log(req)
  console.log("Handling logout here");
  res.status(200).send("ok");
});

app.post("/", (req, res) => {
  console.log(req)
  console.log("even admin here");
  res.status(200).send("ok");
});

const server = http.createServer(app);

server.listen(9001, () => {
  console.log(`SERVICE-1 is listening on port ${9001}`);
});

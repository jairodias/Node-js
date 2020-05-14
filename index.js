const express = require("express");
const server = express();
server.use(express.json());

const users = ["Jairo", "Teste"];
// MIDDLEWARE
server.use((req, res, next) => {
  console.log(`Metódo: ${req.method}, ULR: ${req.url}`);
  return next();
});

// MIDDLEWARE VERIFICAÇÃO
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkParams(req, res, next) {
  const user = users[req.params.index];
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkParams, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkParams, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);

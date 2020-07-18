const express = require('express');
const server = express();

const ActionRouter = require("./actions/actionRouter");
const ProjectModel = require('./data/helpers/projectModel');

server.use(logger);
server.use(express.json());

server.get("/", (req, res) =>{
    res.send(`<h1>I think, therefore I am</h1>`)
});

server.use("/api/actions", ActionRouter);
// server.use("/api/projects", ProjectModel);

function logger(req, res, next){
    console.log(`${req.method} ${req.originalUrl} at ${new Date().toString()}`)
    next();
}

module.exports = server;
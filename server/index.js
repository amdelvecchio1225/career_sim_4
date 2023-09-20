const express = require("express");
const app = express();
const path = require("path");
const PORT = 8081;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require('cors');
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use('/api', require('./api'));

app.get("*/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
    console.log('On port'+ PORT)
});
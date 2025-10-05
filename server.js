const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./chamados.json";
const TECNICOS_FILE = "./tecnicos.json";
const CLIENTES_FILE = "./clientes.json";

function readJson(file) {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function saveJson(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/chamados", (req, res) => res.json(readJson(DATA_FILE)));
app.post("/chamados", (req, res) => {
    const chamados = readJson(DATA_FILE);
    chamados.push(req.body);
    saveJson(DATA_FILE, chamados);
    res.json({ success: true });
});
app.put("/chamados/:index", (req, res) => {
    const chamados = readJson(DATA_FILE);
    chamados[req.params.index] = req.body;
    saveJson(DATA_FILE, chamados);
    res.json({ success: true });
});
app.get("/exportar", (req, res) => {
    const chamados = readJson(DATA_FILE);
    res.setHeader("Content-Disposition", "attachment; filename=chamados.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(chamados, null, 2));
});

// Técnicos
app.get("/tecnicos", (req, res) => res.json(readJson(TECNICOS_FILE)));
app.post("/tecnicos", (req, res) => {
    const tecnicos = readJson(TECNICOS_FILE);
    tecnicos.push(req.body);
    saveJson(TECNICOS_FILE, tecnicos);
    res.json({ success: true });
});

// Clientes
app.get("/clientes", (req, res) => res.json(readJson(CLIENTES_FILE)));
app.post("/clientes", (req, res) => {
    const clientes = readJson(CLIENTES_FILE);
    clientes.push(req.body);
    saveJson(CLIENTES_FILE, clientes);
    res.json({ success: true });
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));

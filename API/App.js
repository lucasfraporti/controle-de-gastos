const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const App = express();
const port = 3001;

App.use(cors());
App.use(express.json());

const db = mysql.createConnection({
    user: "root",
    password: "",
    database: "pila",
    host: "localhost"
});

// localhost:3001/get
App.get("/get", (req, res) => {
    db.query("SELECT * FROM valores", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/get/:id
App.get("/get/id/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM valores WHERE id = ?", [id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/get/profit
App.get("/get/profit", (req, res) => {
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'E'", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/get/loss
App.get("/get/loss", (req, res) => {
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'S'", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/post
App.post("/post", (req, res) => {
    const id_user = req.body.id_user;
    const {date, price, description, type, category} = req.body;
    db.query("INSERT INTO valores (id_user, date, price, description, type, category) VALUES (?,?,?,?,?,?)", [id_user, date, price, description, type, category], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result);
        };
    });
});

// localhost:3001/update/:id
App.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const {date, price, description, type, category} = req.body;
    db.query("UPDATE valores SET date = ?, price = ?, description = ?, type = ?, category = ? WHERE id = ?", [date, price, description, type, category, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/delete/:id
App.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM valores WHERE id = ?", [id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        };
    });
});

App.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
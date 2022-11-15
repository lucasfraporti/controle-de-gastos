const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const App = express();
const port = 3001;

var dataatual = new Date();

var mesatual = String(dataatual.getMonth() + 1).padStart(2, '0');
var anoatual = dataatual.getFullYear();

App.use(cors());
App.use(express.json());

var db = mysql.createPool({
    "connectionLimit" : 1000,
    "user" : "bc9472943063a8",
    "password": "882ba330",
    "database" : "heroku_a93cc896310b76b",
    "host": "us-cdbr-east-06.cleardb.net",
    "port": 3306
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}
exports.pool = db;

// -------------------------- LOGIN --------------------------

// App.post("/login", (req, res) => {
//     const {username, password} = req.body;
//     db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
//         if(err){
//             res.status(500).send(err);
//         }else if(result.length == 0){
//             res.status(404).send("Usuário ou senha incorretos.");
//         }else{
//             const token = jwt.sign({userId: JSON.parse(JSON.stringify(result))[0].id}, "p1l4@2022", {expiresIn: 600});
//             return res.json({auth: true, token: token});
//         };
//         res.status(401).end();
//     });
// });

// function eq, res, next){
//     const token = req.headers["x-access-token"];
//     jwt.verify(token, "p1l4@2022", (err, decoded) => {
//         if(err){
//             return res.status(401).end();
//         }else{
//             // Buscando o userId do payload
//             req.userId = decoded.userId;
//             console.log(req.userId)
//             next();
//         };
//     });
// };

// localhost:3001/cadastro
App.post('/cadastro', (req, res) => {
    const {username, password} = req.body;
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
        if(err){
            res.status(500).json({error: err});
        }else{
            console.log(result);
        };
    });
});

// localhost:3001/get
App.get("/gettabela/:iduser", (req, res) => {
    const user_id = req.params.iduser;
    db.query("SELECT * FROM valores where month(date) = ? and year(date) = ? and id_user = ? ORDER BY date", [mesatual, anoatual, user_id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});



App.get("/getchart", (req, res) => {
    db.query("SELECT * from valores", (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});
//-->> BUSCAR AS OPERAÇÕES PELO ID DO USUÁRIO, RECEBENDO COMO PARÂMETRO
// localhost:3001/getporuserid/:iduser
App.get("/getprofit/:iduser", (req, res) => {
    const user_id = req.params.iduser;
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'E' and month(date) = ? and year(date) = ?  and id_user = ? ", [mesatual, anoatual,user_id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});

// buscar valores pelos dias
App.get("/operations", (req, res) => {
    db.query("select v.date as data_operation, sum(v.price) as preco_operation from valores v where v.type= 'S' group by date", (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});


App.get("/getloss/:iduser", (req, res) => {
    const user_id = req.params.iduser;
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'S' and month(date) = ? and year(date) = ?  and id_user = ? ", [mesatual, anoatual,user_id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});


// localhost:3001/get/id/:id
App.get("/get/id/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM valores WHERE id = ?", [id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/get/profit
App.get("/get/profit", (req, res) => {
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'E' and month(date) = ? and year(date) = ? ", [mesatual, anoatual], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/get/loss
App.get("/get/loss", (req, res) => {
    db.query("SELECT COALESCE(SUM(price), 0) AS total_sum FROM valores WHERE type = 'S' and month(date) = ? and year(date) = ? ", [mesatual, anoatual],(err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});

// localhost:3001/post
App.post("/post", (req, res) => {
    const {id_user, date, price, description, type, category} = req.body;
    db.query("INSERT INTO valores (id_user, date, price, description, type, category) VALUES (?,?,?,?,?,?)", [id_user, date, price, description, type, category], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json(result);
        };
    });
});

// localhost:3001/update/:id
App.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const {date, price, description, type, category} = req.body;
    db.query("UPDATE valores SET date = ?, price = ?, description = ?, type = ?, category = ? WHERE id = ?", [date, price, description, type, category, id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        };
    });
});

// localhost:3001/delete/:id
App.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM valores WHERE id = ? ", [id], (err, result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        };
    });
});

App.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
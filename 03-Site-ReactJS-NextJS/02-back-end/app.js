const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('./models/home');
const Home = mongoose.model('Home');

require('./models/sobre');
const Sobre = mongoose.model('Sobre');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type, Authorization')
    app.use(cors());
    next();
});

app.use(
    '/file',
    express.static(path.resolve(__dirname, 'tmp', 'uploads'))
);

mongoose.connect('mongodb://localhost/itamar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizado com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não realizada com sucesso! " + erro);
});

app.get("/home", (req, res) => {
    Home.findOne({}).then((home) => {
        return res.json(home);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            mensage: "Nenhum registro encontrado!"
        });
    })
    
});

app.post("/home", (req, res) => {
    Home.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página home não cadastrado com sucesso!"
        });
    });

    return res.json({
        error: false,
        message: "Conteúdo da página home cadastrado com sucesso!"
    });
});

app.get("/sobre", (req, res) => {
    Sobre.find({}).then((sobre) => {
        return res.json({
            sobre,
            urlFile: "http://localhost:8080/file/sobre/"
        })
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Erro: Nenhum registro da página sobre encontrado!"
        })
    });

});

app.post("/sobre", (req, res) => {
    Sobre.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página sobre não cadastrado com sucesso!"
        });
    });

    return res.json({
        error: false,
        message: "Conteúdo da página sobre cadastrado com sucesso!"
    });

});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
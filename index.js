const express          = require("express");
const consign          = require("consign");
const bodyParser       = require("body-parser");
const expressValidator = require("express-validator");

let app = express();

//interpretar os urls 
app.use(bodyParser.urlencoded({ extended: false }));
//transformar os dados em json
app.use(bodyParser.json());

// app.use(expressValidator());

//.include() => vai incluir todos os arquivos da pasta 'routes'
//.into() => dentro do 'APP'
//mudando a estruturas dos arquivos de routas para dentro de uma função
consign().include("routes").include('utils').into(app);

//terminal
app.listen(3000, "127.0.0.1", () => {
  console.log("servidor rodando!");
});
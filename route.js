import express from 'express';
import session from 'cookie-session'
import handlebars from 'express-handlebars';
import { body, param, query, validationResult } from 'express-validator';
import helmet from 'helmet';
import flash from 'connect-flash';
import { CadastroController } from './controller/cadastroController.js';
import { MainController } from './controller/mainController.js';
import crypto, { randomBytes, verify } from 'node:crypto'
import { verifyToken } from './helpers/middlewares.js';

var app = express();


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(helmet());
app.use(session({
    secret: randomBytes(100).toString("base64"),
    name: 'session',
    keys: [randomBytes(100).toString("base64"), randomBytes(100).toString("base64")],
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        httpOnly: true,
        domain: `${URL}`,
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hora
    }
}));
app.use(flash());

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//Main Controller
app.get("/", MainController.get);
// app.post("/", MainController.post);
// app.delete("/", MainController.delete);
// app.put("/", MainController.put);


app.get("/cadastro", CadastroController.get);
app.get("/getListarUm", CadastroController.getListarUm);

app.get("/listarUm",
query("email").isEmail().trim().escape(),
query("nome").not().isEmpty().trim().escape(),
CadastroController.listarUm
);

app.post("/cadastro",
verifyToken,
body("email").isEmail().normalizeEmail(),
body("nome").not().isEmpty().trim().escape(),
body("enderecoWeb").isURL(),
body("telefone").isNumeric({no_symbols: true}),
body("experienciaProfissional").isLength({max: 1000}),
CadastroController.post);

app.get("/listar", CadastroController.listar)
export {app}
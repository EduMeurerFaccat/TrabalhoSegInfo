import { faker } from '@faker-js/faker';
import { pessoaValidador } from '../helpers/validators/pessoaValidator.js'
import { Pessoa, pessoaExemplo } from '../models/pessoa.js';
import crypto, { randomBytes } from 'node:crypto'
import { decryptString, encryptString } from '../config/config.js';
import { generateToken, renovalToken, validateToken } from '../helpers/functions.js';
import { validationResult } from 'express-validator';

let dados = [

]
for (let i = 0; i < 10; i++) {
    let pessoa = {
        nome: faker.name.findName(),
        telefone: faker.phone.number("+55 (##) #####-####"),
        email: faker.internet.email(),
        enderecoWeb: faker.internet.url(),
        experienciaProfissional: faker.lorem.lines(2)
    }
    dados.push(pessoa);
}

var CadastroController = {
    get(req, res) {
        res.render("cadastro", { token: renovalToken(req) });
    },
    post(req, res) {
        let data = req.body;
        console.log(req.session);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("cadastro", { erros: [{ erro: true, msg: "Algo deu errado" }], token: renovalToken(req), pessoa: data });
        }

        if (!validateToken(req, req.body.token)) {
            return res.render("cadastro", { erros: [{ erro: true, msg: "Algo deu errado" }], token: renovalToken(req), pessoa: data });
        }

        let erros = pessoaValidador(req.body);
        if (erros.length === 0) {
            Pessoa.create(data);
        }

        return res.render("cadastro",
            {
                erros: erros,
                success: erros.length === 0,
                token: renovalToken(req),
                pessoa: erros.length > 0 ? data : {}
            }
        );
    },
    delete(req, res) {

    },
    put(req, res) {

    },
    listar(req, res) {
        Pessoa.findAll().then((result) => {
            let pessoas = [];
            result.map(({ dataValues }) => {
                pessoas.push(dataValues);

            })

            res.render("listar", { pessoas })
        })

    },
    listarUm(req, res) {
        let searchData = req.query;
        Pessoa.findOne({ where: { nome: searchData.nome, email: searchData.email } }).then((result) => {
            let pessoa = result.dataValues;
            if (!validateToken(req, req.query.token)) {
                res.render("formListar", { erros: [{ erro: true, msg: "Algo deu errado" }], token: renovalToken(req) });
            }
            res.render("formListar", { pessoa, token: renovalToken(req) });
        }).catch((e)=>{
            
            res.render("formListar", { token: renovalToken(req),  erros: [{ erro: true, msg: "Registro não encontrado" }] });
        })
    },
    getListarUm(req, res) {
        res.render("formListar", { token: renovalToken(req) });
    }

}


export { CadastroController }
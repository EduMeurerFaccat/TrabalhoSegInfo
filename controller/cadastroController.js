import { faker } from '@faker-js/faker';
import { pessoaValidador } from '../helpers/validators/pessoaValidator.js'
import { Pessoa, pessoaExemplo } from '../models/pessoa.js';
import crypto, { randomBytes } from 'node:crypto'
import { decryptString, encryptString } from '../config/config.js';

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
        let token = randomBytes(100).toString('base64');
        
        if (req.session.token === undefined)
            req.session.token = token;
        
        req.session.token = token;

        res.render("cadastro", {token});
    },
    post(req, res) {
        console.log(req.session);
        if(req.session.token !== req.body.token){
            res.render("cadastro", {erros: [{erro: true, msg: "Algo deu errado"}]});
        }
        let erros = pessoaValidador(req.body);
        
        let data = req.body;
        if (erros.length === 0) {
            Pessoa.create(data).then((result) => {
                res.render("cadastro", { erros: erros, success: erros.length === 0 });
            })
        }



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

            res.render("listar", { pessoas})
        })

    }
}


export { CadastroController }
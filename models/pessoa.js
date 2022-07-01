import { Sequelize } from 'sequelize'
import { database } from '../config/config.js';
import { faker } from '@faker-js/faker';

let pessoaExemplo = {
    nome: faker.name.findName(),
    email: faker.internet.email(),
    telefone: faker.phone.number("+55 (##) #####-####"),
    enderecoWeb: faker.internet.url(),
    experienciaProfissional: faker.lorem.lines(2)
}

const Pessoa = database.define('pessoas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    enderecoWeb: {
        type: Sequelize.STRING,
    },
    experienciaProfissional: {
        type: Sequelize.STRING,
        allowNull:true
    }
})

export {Pessoa, pessoaExemplo}
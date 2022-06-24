import { Sequelize } from 'sequelize'
import crypto from 'node:crypto';
import fs from 'fs';

const PASSPHRASE = "123456";

function generateKeyFiles() {
  
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: PASSPHRASE
        }
    });
       
    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
}

if(!fs.existsSync("public_key") && !fs.existsSync("private_key")){
    generateKeyFiles();
}

function encryptString (plaintext, publicKeyFile = "public_key") {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
  
    const encrypted = crypto.publicEncrypt(
         publicKey, Buffer.from(plaintext));
    return encrypted.toString("base64");
}

function decryptString(encryptedString, privateKeyFile = "private_key"){
    const privateKey = fs.readFileSync(privateKeyFile, "utf8");

    const decrypted = crypto.privateDecrypt({key: privateKey, passphrase: PASSPHRASE}, Buffer.from(encryptedString, "base64"));
    return decrypted.toString();
}

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});


const PORT = 80;
const URL = `localhost`

export {
    PORT,
    URL,
    database,
    encryptString,
    decryptString
}
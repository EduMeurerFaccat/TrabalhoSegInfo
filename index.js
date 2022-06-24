import { app } from './route.js';
import { encryptString, database, PORT, URL, decryptString } from "./config/config.js";
import { Pessoa } from './models/pessoa.js';
import crypto from 'node:crypto';

(async () => {
    try {
        await database.sync();
        
    } catch (e) {
        console.log(e);
    }
})()
// let e = encryptString("Teste");
// let d = decryptString(e);
// console.log(e, d);

app.listen(PORT, URL, () => {
    console.log(`Rodando na porta ${PORT}`);
})





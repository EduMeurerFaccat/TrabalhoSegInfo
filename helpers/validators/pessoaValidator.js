import { pessoaExemplo } from "../../models/pessoa.js";

function insereErro(arr, erro, msg){
    arr.push({erro, msg});
}

function pessoaValidador(dados){
    let arr = [{
        erro: false,
        msg: ""
    }]
    delete dados.token;
    arr.shift();

    if(JSON.stringify(Object.keys(dados)) !== JSON.stringify(Object.keys(pessoaExemplo))){       
        insereErro(arr, true, "Alguns campos não foram informados");
    }

    let {nome, email, telefone, enderecoWeb, experienciaProfissional} = dados;

    if(nome.trim() === "" || email.trim() === "" || experienciaProfissional.trim() === ""){
        insereErro(arr, true, "Campos obrigatórios não informados");
    }

    if(!nome.match(new RegExp(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/))){
        insereErro(arr, true, "Nome inválido");
    }

    if(!email.match(RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))){
        insereErro(arr, true, "E-mail inválido");
    }
    
    if(telefone.trim() !== ""){
        if(!parseInt(telefone)){
            insereErro(arr, true, "Telefone só pode ter caracteres numéricos");
        }
    }

    if(enderecoWeb.trim() !== ""){
        if(!enderecoWeb.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi))){
            insereErro(arr, true, "Url não é valida");
        }
    }

    if(experienciaProfissional.length > 1000){
        insereErro(arr, true, "A experiência profissional deve ter até 1000 caracteres com espaços");
    }else{
        if(!experienciaProfissional.match(new RegExp(/\w+/))){
            insereErro(arr, true, "Essa descrição não é válida");
        }
    }

    

    console.log(arr);;

    return arr;
}

export{
    pessoaValidador,
    pessoaExemplo
}
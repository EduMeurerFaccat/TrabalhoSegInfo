import { validateToken } from "./functions.js";

function verifyToken(req, res, next){
    let token = req.body.token || req.params.token || req.query.token;

    if(validateToken(req, token)){
        next();
    }else{
        res.send("Erro inesperado!");
    }
    
}

export{
    verifyToken
}
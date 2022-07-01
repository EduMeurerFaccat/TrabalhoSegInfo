import crypto, { randomBytes } from 'node:crypto'

function generateToken(){
    return randomBytes(100).toString('base64');
}

function validateToken(req, token){
    return req.session.token === token;
}

function renovalToken(req, token = generateToken()){
    req.session.token = token;
    return token;
}
export{
    generateToken,
    validateToken,
    renovalToken
}
const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send("Access denied.");
    try {
        const decodedPaload = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user  = decodedPayload;
        next();
    } catch (error) {
        res.send(400).send("Invalid Token");
    }
}

module.exports = auth;
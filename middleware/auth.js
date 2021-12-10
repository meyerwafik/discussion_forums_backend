const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const verifyToken = (req, res, next) => {
    
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).send("No Authorization Header");
    }
       const bearer = bearerHeader.split(' ');
       const bearerToken = bearer[1];
       
       req.token = bearerToken;
    if (!req.token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(req.token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
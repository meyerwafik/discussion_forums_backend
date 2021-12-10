const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const verifyToken = (req, res, next) => {
    
    console.log(req.headers["authorization"])
    console.log(req.headers["Authorization"])
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
        console.log("🚀 ~ file: auth.js ~ line 24 ~ verifyToken ~ err", bearerToken)
        console.log("🚀 ~ file: auth.js ~ line 24 ~ verifyToken ~ err", err)
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
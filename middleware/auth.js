const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {                                   // If no token is found in the header
        return res.status(401).json({ msg: " No token, authorization denied" });
    }
    //If token is present in the header
    try {
        //Verify Token with the signature secret key:
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Add user from payload
        req.user = decoded;
        next()
    }
    catch (e) {
        res.status(400).json({ msg: "Invalid Token" })              // If the jwt waasn't verified
    }
}

module.exports = auth;
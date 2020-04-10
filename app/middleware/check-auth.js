const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config/env.config.js');


module.exports = (req, res, next) => {
	try{
		const tocken = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(tocken, JWT_KEY.key);
		req.userData = decoded;
		next();

	} catch (error){
		return res.status(401).json({
					message: 'AUTH FAILED!'});

	}
};
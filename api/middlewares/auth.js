const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const verifyToken = async (req, res, next) => {
	const token = req.headers.token;
	if (token) {
        const ascessToken = token.split(" ")[1];
        jwt.verify(ascessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token khong hop le");
            }
            req.user = user;
            req.token = token;
            
            next();
        });
	} else {
		return res.status(401).json("Khong quyen truy cap");
	}
	
};

const verifyTokenAdmin = async (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if((req.user.id == req.user.id)|| req.user.role=="admin"){
            next();
        }else {
            return res.status (403).json("Khong quyen truy cap")
        }
    })
}
module.exports = {
    verifyToken, verifyTokenAdmin,
    
};

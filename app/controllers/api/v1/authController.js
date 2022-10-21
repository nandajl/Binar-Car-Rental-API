
const authService = require('../../../services/authServices')

module.exports = {
    register(req,res){
        const {email, password} = req.body;
        const role = "member"
        authService.register(email, password, role).then((user)=>{
            res.status(201).json({
                status: "OK",
                data: user
            })
        }).catch((err)=>{
            res.status(400).json({
                staus: "FAIL",
                message: err.message,
            });
        });

    },

    registerAdmin(req,res){
        const {email, password} = req.body;
        const role = "admin"
        authService.register(email, password, role).then((user)=>{
            res.status(201).json({
                status: "OK",
                data: user
            })
        }).catch((err)=>{
            res.status(400).json({
                staus: "FAIL",
                message: err.message,
            });
        });

    },

    login(req,res){
        const {email, password} = req.body;
        // console.log(email);
        authService.login(email, password).then((auth)=>{
            if(!auth){
                res.status(401).json({
                    staus: "FAIL",
                    message: "Email or password is not identified",
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        }).catch((err)=>{
            res.status(400).json({
                staus: "FAIL",
                message: err.message,
            });
        });
    },

    authorize(req, res, next){
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(403).json({
                message: "Unauthorized",
            })
        }

        const token = bearerToken.split('Bearer ')[1];
        authService.authorize(token).then((user) =>{
            if (!user) {
                res.status(403).json({
                    message: "Unauthorized"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message: "Unauthorized",
            })
        }) 
    },

    authorizeSuperAdmin(req, res, next){
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(403).json({
                message: "Unauthorized",
            })
        }

        const token = bearerToken.split('Bearer ')[1];
        authService.authorizeSuperAdmin(token).then((user) =>{
            if (!user) {
                res.status(403).json({
                    message: "Your not a superadmin"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message: "Unauthorized",
            })
        }) 
    },
    authorizeAdmin(req, res, next){
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(403).json({
                message: "Unauthorized",
            })
        }

        const token = bearerToken.split('Bearer ')[1];
        authService.authorizeAdmin(token).then((user) =>{
            if (!user) {
                res.status(403).json({
                    message: "Your not an admin"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message: "Unauthorized",
            })
        }) 
    },

    whoAmI(req, res){
        const user = req.user;
        res.status(201).json({
            status: "OK",
            data: user
        }).catch()
        
        
    }
}
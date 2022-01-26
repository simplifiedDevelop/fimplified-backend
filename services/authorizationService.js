var jwt = require('jsonwebtoken');

const authorizationService = {
    
    AdminAuthorization: async (req, authRols) => {
        let token = req.headers["authorization"]
        let response = {
            status: 200,
            message: "Ok"
        }
        jwt.verify(token, conn.llave, function(err, decoded){
            if(err){
                response = {
                    status: 500,
                    message: "error"
                }
            }else{
                let rol = decoded["user"]["rol"]
                if(authRols.includes(rol)){ //rol === authRol
                    response = {
                        status: 200,
                        message: "Ok"
                    }
                }else{
                    response = {
                        status: 403,
                        message: "unauthorized"
                    }
                }
            }
            

        })
        return response
    },
}
module.exports = authorizationService

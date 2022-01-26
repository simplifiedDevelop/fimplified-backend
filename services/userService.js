const UserRepository = require('../repositories/usersRepository')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserService = {

    getUsers: async () => {
        let dbUser = await UserRepository.getUsers()
        if(dbUser.susses){
            let users = dbUser.result
            let response = {response: users};
            return response;
        }else{
            response = {error: "SQL Error"}
            return response;
        }
    },

    userLogin: async (email, password) => {
        let userByEmal = await UserRepository.getUserByEmail(email)
        if(userByEmal.susses){
            let user 	= userByEmal.result;
            const comparison = await bcrypt.compare(password, user.password)
            if(comparison){
                const payload 	= {user};
                const token 	= jwt.sign(payload, conn.llave, {expiresIn: 7200});
                response 		= {response: user, token: token};
                return response;
            }
        }
        response = {error: "Usuario / Contraseña incorrectos"}
        return response; 
    },

    //In progress
    createUser: async (user) =>{
        const email = user.email
        let userByEmal = await UserRepository.getUserByEmail(email)
        if(!userByEmal.susses){
            let encryptedPassword = await bcrypt.hash(user.password, saltRounds)
            user.password = encryptedPassword
            let dbUser = await UserRepository.insertUser(user)
            if(dbUser.susses){
                let response = {response: "Created"};
                return response;
            }else{
                response = {error: "SQL Error"}
                return response;
            }
        }else{
            response = {error: `User with email ${email} already exits`}
            return response;
        }
    },
}
module.exports = UserService

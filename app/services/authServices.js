const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken')

async function encryptPassword(str){
    try {
        const hash = await bcrypt.hash(str, 10);
        return hash;
        
    } catch (err) {
        console.log(err);
    }
}

// encryptPassword('admin123').then((hash)=>{console.log(hash)});

async function comparePassword(password, encryptedPassword){
    try {
        const isValid = await bcrypt.compare(password, encryptedPassword);
        return isValid
    } catch (err) {
        console.log(err);
    }
}

const SECRET_KEY = 'Secret'

function createWebToken(payload) {
    return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

// encryptPassword('admin123').then((hash)=>{
//     comparePassword('admin123', hash).then((isValid) => console.log(isValid));
// });

module.exports = {
    encryptPassword,

    async register(email, password, role){
        try {
            const encryptedPassword = await encryptPassword(password);
            if (!encryptedPassword) {
                return false;
            }
            const body = {
                email,
                password: encryptedPassword,
                role
            }
            const user = await userRepository.create(body);
    
            return user;
            
        } catch (err) {
            throw err;
        }
    },

    async login(email, password){
        try {
            const user = await userRepository.findUser({email});
    
            if (!user) {
                return false;
            }
    
            const {password: encryptedPassword} = user;
            // console.log(encryptedPassword)
            // console.log(password);
            const isAuthenticated = await comparePassword(password, encryptedPassword);
        
            if (!isAuthenticated) {
                return false
            }
    
            //generate token
            const token = createWebToken({
                id: user.id,
                email: user.email,
                role : user.role
            })

            const data = {
                ...user.dataValues,
                token
            }

            return data;
            
        } catch (err) {
            throw err;
        }
    },

    async authorize(token){
        try {
            const payload = verifyToken(token);
    
            const id = payload?.id;

            const user = await userRepository.findUser(id);
            return user;

        } catch (err) {
            return err;
        }
    },
    
    async authorizeSuperAdmin(token){
        try {
            const payload = verifyToken(token);
    
            const id = payload?.id;
            const role = payload?.role;
            if (role != "superadmin") {
                return false;
            }

            const user = await userRepository.findUser(id);
            return user;

        } catch (err) {
            return err;
        }
    },

    async authorizeAdmin(token){
        try {
            const payload = verifyToken(token);
    
            const id = payload?.id;
            const role = payload?.role;
            if (role == "superadmin" || role == "admin") {
                const user = await userRepository.findUser(id);
        
                return user;
                
            }
            return false;
        } catch (err) {
            return err;
        }
    }


}
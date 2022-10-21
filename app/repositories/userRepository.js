const { User } = require('../models');

module.exports = {
    create(body){
        return User.create(body);
    },

    findUser(condition){
        return User.findOne({where: condition})
    },

    findUserByPk(id){
        return User.findByPk(id);
    }
}


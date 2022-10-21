const { Car } = require('../models');

module.exports = {
    create(body){
        return Car.create(body);
    },
    update(id, update) {
        return Car.update(update, {
          where: {
            id,
          },
        });
      },
    
      delete(id) {
        return Car.destroy(id);
      },
    
      find(id) {
        return Car.findByPk(id);
      },
    
      findAll(condition) {
        return Car.findAll({where : condition});
      },
    
      getTotalCar(condition) {
        return Car.count({where : condition});
      },
}
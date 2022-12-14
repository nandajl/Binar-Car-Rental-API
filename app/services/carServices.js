const carRepository = require('../repositories/carRepository');

module.exports = {
    create(requestBody) {
        return carRepository.create(requestBody);
    },
    
    update(id, requestBody) {
        return carRepository.update(id, requestBody);
    },

    delete(id) {
        return carRepository.delete(id);
    },

    async list(isDeleted) {
        try {
            const cars = await carRepository.findAll({isDeleted});
            const carCount = await carRepository.getTotalCar({isDeleted : false});

            return {
                data: cars,
                count: carCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        const condition = {id: id, isDeleted : false}
        return carRepository.find(condition);
    },
}
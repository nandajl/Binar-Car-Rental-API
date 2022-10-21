const carServices  = require('../../../services/carServices');

module.exports = {
    async create(req,res){
        try {
            const dataCar = {
                name : req.body.name,
                price : req.body.price,
                size: req.body.size,
                isDeleted : false,
                createdBy : req.user.email,
                updatedBy : req.user.email
            }
            const car = await carServices.create(dataCar);
            res.status(201).json({
                status:"OK",
                data:car
            });
        } catch (err) {
            res.status(400).json({
                status:"FAIL",
                message:err.message
            })
        }
    },
    async update(req,res){
        try {
            const dataCar = {
                name : req.body.name,
                price : req.body.price,
                size: req.body.size,
                updatedBy : req.user.email
            }
            const car = await carServices.update(req.params.id, dataCar);
            res.status(201).json({
                status:"OK",
                data: dataCar
            });
        } catch (error) {
            res.status(400).json({
                status:"FAIL",
                message:err.message
            })
            
        }
    },

    async list(req, res){
        try {
            const isDeleted = false;
            const {data, count} = await carServices.list(isDeleted);
            res.status(200).json({
                status: "OK",
                data: { cars: data },
                total: { total: count },
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
              });
        }
    },

    async show(req,res){
        try {
            const car = await carServices.get(req.params.id);
            res.status(200).json({
                status: "OK",
                data: car,
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async destroy(req, res){
        try {
            const id = req.params.id
            await carServices.update(id, {
                isDeleted : true,
                deletedBy : req.user.email
            });
            res.status(200).json({
                status: "OK",
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    }

}

const DevModel = require('../models/DevModel')

module.exports = {
    async index(request, response){
        const {id} = request.params

        const dev = await DevModel.findById(id)
        console.log(dev)
        return response.json(dev)
    }
}
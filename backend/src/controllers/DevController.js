const axios = require('axios')
const DevModel = require('../models/DevModel')
const parseStringAsArray = require('../utils/parseStringAsArrays')
const {findConnections, sendMessage } = require('../websocket')

//index = listar, show = mostrar unico, store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await DevModel.find();
        
        return response.json(devs)
    },

    async store (request, response) {
    const { github_username , techs, latitude, longitude} = request.body

    let dev = await DevModel.findOne({ github_username })

    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
 
        //if name não existir, por padrao login
        const { name = login, avatar_url, bio } = apiResponse.data
    
        const techsArray = parseStringAsArray(techs)
    
        //Pegar as latitudes e longitudes e armazenar no tipo especificado na model 
        const location = {
            type:'Point',
            coordinates: [longitude,latitude]
        }
    
         dev = await DevModel.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs : techsArray,
            location
        })

        //Filtrar as conexôes que estão há no máximo 10 km de distância e que
        // o novo dev tenha pelo menos uma das tecnologias filtradas

        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
            techsArray)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
    }
 
    return response.json(dev)
    },

    async update(request, response) {
    //update nome, avatar, bio, techs
        const {id: idDev} = request.params

        const { name , avatar_url , bio, techs } = request.body

        const techsArray = parseStringAsArray(techs)

        const devUpdate  = await DevModel.findByIdAndUpdate(idDev, {
            name ,
            avatar_url,
            bio,
            techs : techsArray
        }, {new: true})

        return response.json(devUpdate)
    },

    async destroy(request, response){
        //destroy
        const { id: idDev } = request.params
        const dev = await DevModel.findByIdAndDelete(idDev)

        return response.json(dev)
    }
}
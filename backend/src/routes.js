const { Router } = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Métodos HTTP get, post, put, delete

// Tipos de parâmetroscls

// Query Params: request.query (Filtros, ordenação, paginação, pesquisa)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs',DevController.index)
routes.post('/devs', DevController.store)
routes.put('/dev/:id',DevController.update)
routes.delete('/dev/:id',DevController.destroy)

routes.get('/search',SearchController.index)

module.exports = routes

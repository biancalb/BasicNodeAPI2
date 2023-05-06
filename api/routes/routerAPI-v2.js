const express = require ('express')
const routerAPIv2 = express.Router()
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
}})

//processa body em formato json
routerAPIv2.use(express.json())

routerAPIv2.post ('/produtos', function (req, res) {
    knex('produtos').insert(req.body, ['id'])
    .then (produtos => {
      let id = produtos[0].id
      res.json({ message: `Produto salvo com sucesso.`, id  })
    })
    .catch (err => res.json ({ message: `Erro ao salvar produto: ${err.message}` }))
})

//GET lista
routerAPIv2.get ('/produtos', function (req, res) {
    knex.select('*').from('produtos')
    .then (produtos => res.json(produtos))
    .catch (err => res.json ({ message: `Erro ao recuperar produtos: ${err.message}` }))
})

//GET
routerAPIv2.get('/produtos/:id', function (req, res) {
    const { id } = req.params;

    knex('produtos').where('id', id)
    .then( produto => res.status(200).json(produto) )
    .catch(err => {
        res.status(404).json({message: 'Produto não encontrado' + err.message })
    })
})

routerAPIv2.put ('/produtos/:id', function (req, res) {
    const { id } = req.params;
    const produto = req.body;

    knex('produtos').where('id', id).update(produto, ['id', 'descricao'])
    .then (prod => {
        res.json({ message: `Produto ${prod[0].id} (${prod[0].descricao}) alterado com sucesso.` })
      })
    .catch (err => res.json ({ message: `Erro ao alterar produto: ${err.message}` }))
})

routerAPIv2.delete ('/produtos/:id', function (req, res) {
    const { id } = req.params;
    console.log(id)
    knex('produtos').where('id', id).del()
    .then (prod => {
        res.json({ message: `Produto ${id} excluído com sucesso.` })
      })
      .catch (err => res.json ({ message: `Erro ao excluir produto ${id}: ${err.message}` }))
    })


module.exports = routerAPIv2
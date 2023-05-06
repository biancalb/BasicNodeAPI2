const express = require ('express')
const routerClient = express.Router()

routerClient.use(express.static('public', {
    index: ["index.html", "index.php"],

}))

module.exports = routerClient
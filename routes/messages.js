const {Router}= require('express')
const router = Router()

router.get('/', (req, res) => {
    res.send('Mensaje recibido')
}) //End point

router.get('/hi', (req, res) => {
    res.send('Hola Mundo')
}) //End point

router.get('/bye', (req, res) => {
    res.send('Adios Mundo')
}) //End point

module.exports = router
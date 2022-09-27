const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes'})
}

const hiMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes Hola'})
}

const byeMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes Adios'})
}

const postMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes post'})
}

const putMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes put'})
}

const deleteMessage = (req = request, res = response) => {
    res.json({msg: 'Mesanjes delete'})
}

module.exports = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage }
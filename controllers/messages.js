const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    res.status(404).json({msg: 'Mesanjes'})
}

const hiMessage = (req = request, res = response) => {
    res.status(301).json({msg: 'Mesanjes Hola'})
}

const byeMessage = (req = request, res = response) => {
    res.status(201).json({msg: 'Mesanjes Adios'})
}

const postMessage = (req = request, res = response) => {
    res.status(402).json({msg: 'Mesanjes post'})
}

const putMessage = (req = request, res = response) => {
    res.status(206).json({msg: 'Mesanjes put'})
}

const deleteMessage = (req = request, res = response) => {
    res.status(208).json({msg: 'Mesanjes delete'})
}

module.exports = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage }
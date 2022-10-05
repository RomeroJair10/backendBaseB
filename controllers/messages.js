const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    const {nombre, apellido_paterno} = req.query
    //console.log(nombre)
    if(!nombre) {
        res.status(400).json({
            msg: "Falta indicar el nombre"
        })
        return
    }
    if(!apellido_paterno) {
        res.status(400).json({
            msg: "Falta indicar el apellido paterno"
        })
        return
    }
    res.status(404).json({msg: 'Mi nombre es ' + nombre + ' ' + apellido_paterno})
}

const hiMessage = (req = request, res = response) => {
    const {name, edad} = req.params
    res.status(301).json({msg: 'Hola ' + name + ' ' + edad})
}

const byeMessage = (req = request, res = response) => {
    res.status(201).json({msg: 'Mesanjes Adios'})
}

const postMessage = (req = request, res = response) => {
    const {no_control, nombre } = req.body
    //console.log({no_control,nombre})
    res.json({msg: `Numero de control: ${no_control}, nombre: ${nombre}`})
}

const putMessage = (req = request, res = response) => {
    res.status(206).json({msg: 'Mesanjes put'})
}

const deleteMessage = (req = request, res = response) => {
    res.status(208).json({msg: 'Mesanjes delete'})
}

module.exports = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage }
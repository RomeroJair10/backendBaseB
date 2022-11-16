const express = require('express')
const messagesRouter = require('./routes/messages')
const usuariosRouter = require('./routes/usuarios')
const residentRouter = require('./routes/Resident')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            messages: "/api/v1/messages",
            usuarios: "/api/v1/usuarios",
            resident: "/api/v1/Resident"
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.messages, messagesRouter)
       this.app.use(this.paths.usuarios, usuariosRouter)
       this.app.use(this.paths.resident, residentRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server
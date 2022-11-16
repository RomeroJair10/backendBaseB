const{reques, response, request} = require("express")
//const {query} = require("../db/connection")
const pool = require("../db/connection")
const modelResident = require("../models/Resident")
const {queryPersonExist} = require("../models/Resident")

const getChar = async (req = reques, res = response) => {
    let conn
    
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const Chars = await conn.query(modelResident.queryGetChar, (error) => {if(error) throw error})

        if(Chars.length === 0) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: "Characters no esta registrado"})
            return
        }
        res.json({Chars})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getCharByID = async (req = request, res = response) =>{
    const {id} = req.params//URI params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [Chars] = await conn.query(modelResident.queryGetCharByID,[id], (error) => {if (error) throw error})
        console.log(Chars)

        if(!Chars){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `Characters no esta registrados con el ID ${id}`})
            return
        }
        res.json({Chars})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const deleteCharByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelResident.queryDeleteCharByID,[id], (error) => {if(error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `El Characters no esta registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elimino el Characters con la ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }

}

const addPersonaje = async (req = request, res = response) => {
    const {Name, Surname, Gender, Profile, Status} = req.body//URI params
   

    if(!Name || !Surname || !Gender || !Profile || !Status){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;

    try {

        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [PersonExist] = await conn.query(modelResident.queryCharExists, [Name])
        
        if (PersonExist) {
            res.json({msg:`Characters: '${Name}' se encuentra registrado.`})
            return
        }
        //generamos la consulta
        const result = await conn.query(modelResident.queryPersonAdd, 
            [Name, Surname, Gender, Profile, Status], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se pudo agregar el nombre de Characters '${Name}'`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el nombre de Characters '${Name}'`})//Se manda la lista de usuarios
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updateCharByPersona = async (req = request, res = response) => {
    const { Name, Surname, Gender, Profile } = req.body//URI params

    if(!Name || !Surname || !Profile) 
    { res.status(400).json({msg: "Faltan Datos"})
    return }

    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        const [charExist] = await conn.query(modelResident.queryCharExists, [Name])
        
        if (!charExist) {
            res.json({msg: `El Characters '${Name} no se encuentra registrado`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(`UPDATE Characters SET 
                    Name = '${Name}', Surname = '${Surname}', 
                    ${Gender ? `Gender = '${Gender}',` : ''} 
                    Profile = '${Profile}' WHERE Name = '${Name}'`, 
                    (error) => {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber registrado la informacion
                    res.status(404).json({msg: `No se pudo agregar el Characters con el Name ${Name}`})
                    return
                    }
                    
                    res.json({msg:`Se actualizo satisfactoriamente el Characters ${Name}`})
                    //Se manda la lista de usuarios
        }

    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
                 }
    
    finally{
        if (conn) conn.end()//Termina la conexión
           }

}

module.exports = {getChar, getCharByID, deleteCharByID, addPersonaje, updateCharByPersona}
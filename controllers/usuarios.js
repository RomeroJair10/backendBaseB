const{reques, response, request} = require("express")
const {query} = require("../db/connection")
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const modelUsuarios = require("../models/usuarios")

const getUsers = async (req = reques, res = response) => {
    let conn
    
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [users] = await conn.query(modelUsuarios.queryGetUsers, (error) => {if(error) throw error})

        if(users.length === 0) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen usuarios registrados"})
            return
        }
        res.json({users})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}


const getUserByID = async (req = request, res = response) =>{
    const {id} = req.params//URI params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [users] = await conn.query(modelUsuarios.queryGetUserByID,[id], (error) => {if (error) throw error})
        console.log(users)

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }
        res.json({users})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}


const deleteUserByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelUsuarios.queryDeleteUserByID,[id], (error) => {if(error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen usuarios registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el usuario con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }

}


const addUser = async (req = request, res = response) => {
    const {
        Nombre, Apellidos, 
        Edad, Genero = '', 
        Usuario, Contrasena, 
        Fecha_Nacimiento = '1900-01-01', 
        Activo
         } = req.body//URI params

    if (!Nombre || !Apellidos || 
        !Edad || !Usuario || 
        !Contrasena || !Activo)
       {
        res.status(400).json({msg: "Faltan Datos"})
        return
       }

    const salt = bcryptjs.genSaltSync()
    const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
    let conn;

    try {
        
        conn = await pool.getConnection()//Realizamos la conexión
        
         //generamos la consulta
         const [userExist] = await conn.query(modelUsuarios.queryUserExists, [Usuario], (error) =>{if(error) throw error})
        
        if(userExist){
            res.json({msg:`El Usuario: '${Usuario}' ya se encuentra registrado.`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query( modelUsuarios.queryAddUser, 
                        [Nombre, Apellidos, 
                         Edad, Genero, 
                         Usuario, Contrasena, 
                         Fecha_Nacimiento, Activo], 
                         (error) => {if(error) throw error})

        if (result.affectedRows === 0) {   //En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Nombre}`})
            return
        }
                    
            res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Nombre}`}) //Se manda la lista de usuarios
        }
   
        catch (error) {
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }
    finally{
        if (conn) conn.end()//Termina la conexión
    }

}


const updateUserByUsuario = async (req = request, res = response) => {
    const {
           Nombre, Apellidos, 
           Edad, Genero, 
           Usuario, Fecha_Nacimiento = '1900-01-01'
          } = req.body//URI params

    if(!Nombre || !Apellidos || !Edad || !Usuario) 
    {
    res.status(400).json({msg: "Faltan Datos"})
    return
    }

    let conn;

    try {
        
        conn = await pool.getConnection()//Realizamos la conexión
        const [userExist] = await conn.query(modelUsuarios.queryUserExists, [Usuario])
        
        if (!userExist) {
            res.json({msg: `El Usuario '${Usuario} no se encuentra registrado`})
            return
        }

                    //generamos la consulta
                    const result = await conn.query(`UPDATE Usuarios SET 
                    Nombre = '${Nombre}', 
                    Apellidos = '${Apellidos}', 
                    Edad = ${Edad}, 
                    ${Genero ? `Genero = '${Genero}',` : ''} 
                    Fecha_Nacimiento = '${Fecha_Nacimiento}' 
                    WHERE Usuario = '${Usuario}'`, 
                    (error) => {if (error) throw error})

                    if (result.affectedRows === 0) {//En caso de no haber registrado la informacion
                    res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Nombre}`})
                    return
                    }
                    
                    res.json({msg:`Se actualizo satisfactoriamente el usuario ${Usuario}`})//Se manda la lista de usuarios
        }

    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
                 }
    
    finally{
        if (conn) conn.end()//Termina la conexión
           }

}


const signIN = async (req = request, res = response) =>{
    const {Usuario, Contrasena} = req.body //URI params

    if(!Usuario || !Contrasena) {
        res.status(400).json({msg: "Faltan datos."})
        return
                                }

    let conn;

    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelUsuarios.querySignIn, 
              [Usuario], (error) => {if(error) throw error})

        if(!user) {
            res.status(403).json({msg: "El usuario o contraseña que se ingreso no son válidos"})
            return
                  }

        const contrasenaValida = bcryptjs.compareSync(Contrasena, user.Contrasena)

        if (!contrasenaValida) {
            res.status(403).json({msg: "El usuario o contraseña que se ingreso no son válidos"})
            return
                               }

        res.json({msg:`El usuario se ha autenticado correctamente.`})
    }
    
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
                 } 
    
    finally{
        if (conn) conn.end() //termina la conexion
           }
}


const cambiocon = async (req = request, res = response) =>{
    const {Usuario, Contrasena, nuevaContrasena} = req.body

    if(!Usuario || !Contrasena || !nuevaContrasena){
        res.status(400).json({msg: "Faltan datos."})
        return
    }

    let conn;
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [Pass] = await conn.query( 
            `SELECT Contrasena, Usuario FROM Usuarios WHERE 
            Usuario = ?`, [Usuario], 
            (error) => {if(error) throw error})

         if(!Pass){
            res.status(403).json({msg: "El usuario es invalido"})
            return
                  }
         
         const contrasenavalida = bcryptjs.compareSync(Contrasena, Pass.Contrasena)
         console.log(contrasenavalida)
         const salt = bcryptjs.genSaltSync()
         const contrasenaCifrada = bcryptjs.hashSync(nuevaContrasena, salt)

         if(!contrasenavalida){
            res.status(403).json({msg: "El usuario o contraseña son incorrectos"})
            return
                            }
         
        const updatepass = await conn.query(`UPDATE Usuarios SET Contrasena = 
        '${contrasenaCifrada}' 
        WHERE Usuario = '${Usuario}'`,
        (error) => {if (error) throw error})
        res.json({msg:`Se a actualizado la nueva contraseña.`})
    }
    
    catch (error){
        console.log(error)
        res.status(500).json({msg: error}) 
                 } 
    finally{
        if (conn) conn.end() //termina la conexion
           }

}


module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario, signIN, cambiocon}
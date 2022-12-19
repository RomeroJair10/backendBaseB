const modelsUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios",
    queryGetUsersByID:`SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteUsersByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = '?'`,
    queryAddUser:
    `INSERT INTO Usuarios(
                            Nombre,
                            Apellidos, 
                            Edad, 
                            Genero, 
                            Usuario, 
                            Contrasena,
                            Fecha_Nacimiento,
                            Activo)
                        VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?)`,
    querySignIn: `SELECT Contrasena, Activo FROM Usuarios WHERE Usuario = ?`
    }
    
    const updateUsuario = 
        (Nombre, 
         Apellidos, 
         Edad, 
         Genero, 
         Usuario, 
         Fecha_Nacimiento
         ) => {
            return`UPDATE Usuarios SET Nombre =
                   Nombre = '${Nombre}',
                   Apellidos = '${Apellidos}',
                   Edad = ${Edad},
                   ${Genero ? `Genero = '${Genero}',`:''}
                   Fecha_Nacimiento = '${Fecha_Nacimiento}'
                   WHERE Usuario = '${Usuario}'`
         }
    
    
    module.exports = {modelsUsuarios, updateUsuario}
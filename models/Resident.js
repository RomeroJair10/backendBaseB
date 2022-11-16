const modelResident = {
    queryGetChar: "SELECT * FROM Characters",
    queryGetCharByID: `SELECT * FROM Characters WHERE ID = ?`,
    queryDeleteCharByID: `UPDATE Characters SET Status = 'N' WHERE ID = ?`,
    queryCharExists:`SELECT Name FROM Characters WHERE Name = ?`,
    queryPersonAdd: `INSERT INTO Characters (
    Name, 
    Surname, 
    Gender, 
    Profile, 
    Status) Values (?, ?, ?, ?, ?)
    `
}

module.exports = modelResident


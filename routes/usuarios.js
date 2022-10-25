const{Router} = require("express")
const { getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario} = require("../controllers/usuarios")

const router = Router()

//http://localhost:4000/api/v1/users/

///GET///
router.get("/", getUsers)

router.get("/id/:id", getUserByID)

///POST///
router.post("/", addUser)

///PATCH///
router.put("/", updateUserByUsuario)


///DELETE///
router.delete("/id/:id", deleteUserByID)

module.exports = router
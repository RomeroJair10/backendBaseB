const{Router} = require("express")
const { getChar, getCharByID, deleteCharByID, addPersonaje, updateCharByPersona } 
= require("../controllers/Resident")

const router = Router()

//http://localhost:4000/api/v1/users/

///GET///
router.get("/", getChar)

router.get("/id/:id", getCharByID)

///POST///
router.post("/", addPersonaje)

///PATCH///
router.put("/", updateCharByPersona)


///DELETE///
router.delete("/id/:id", deleteCharByID)

module.exports = router
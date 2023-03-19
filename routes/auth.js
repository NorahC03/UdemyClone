import express from "express";
const router = express.Router();

//middleware function
import { userExist } from "../middleware/index"
import { register, login, logout, currentUser } from '../controllers/auth'


//routes
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get("/currentUser", userExist, currentUser)
// router.get("/hello", (req, res) => {
//     res.send("hello")
// })
module.exports = router;
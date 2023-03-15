
import { Router } from "express"
const router = Router()

const {
    login,
    register
} = require('../controllers/authController')

router.post('/login',login)

router.post('/register', register)

export default router

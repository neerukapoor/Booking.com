const router = require('express').Router()
import authController from '../controllers/authController'

router.post('/signup', authController.signup)
router.post('/login', authController.login)

export default router

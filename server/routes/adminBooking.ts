const router = require('express').Router()
import bookingController from '../controllers/bookingController'
import {authenticateAdminJwtToken} from '../middleware/authMiddleware'

router.get('/loggedIn', authenticateAdminJwtToken, bookingController.isLoggedIn)

export default router

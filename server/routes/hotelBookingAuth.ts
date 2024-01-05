const router = require('express').Router()
import hotelBooking from '../controllers/hotelBooking'
import {authenticateAdminJwtToken} from '../middleware/authMiddleware'

router.get('/hotel', authenticateAdminJwtToken, hotelBooking.booking)

export default router

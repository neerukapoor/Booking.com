const router = require('express').Router()
import hotelBooking from '../controllers/hotelBooking'
import {authenticateAdminJwtToken} from '../middleware/authMiddleware'

router.get('/hotel', authenticateAdminJwtToken, hotelBooking.booking)
router.get('/room', authenticateAdminJwtToken, hotelBooking.addRoom)
router.get('/reserveRoom', authenticateAdminJwtToken, hotelBooking.reserveRoom)

export default router

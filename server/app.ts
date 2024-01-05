import express from 'express'
import bookingRouter from './routes/adminBooking'
import adminAuthRouter from './routes/adminAuth'
import hotelBookingRouter from './routes/hotelBookingAuth'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())
app.use('/', bookingRouter)
app.use('/admin', adminAuthRouter)
app.use('/admin', hotelBookingRouter)

export default app

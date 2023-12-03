import express from 'express'
const app = express()
import indexRouter from './routes/index'
import adminAuthRouter from './routes/adminAuth'

app.use(express.json())

app.use('/', indexRouter)
app.use('/admin', adminAuthRouter)

export default app
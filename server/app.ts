import express from 'express'
import indexRouter from './routes/index'
import adminAuthRouter from './routes/adminAuth'

const app = express()
app.use(express.json())

app.use('/', indexRouter)
app.use('/admin', adminAuthRouter)

export default app
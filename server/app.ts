import express from 'express'
import indexRouter from './routes/index'
import adminAuthRouter from './routes/adminAuth'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())
app.use('/', indexRouter)
app.use('/admin', adminAuthRouter)

export default app

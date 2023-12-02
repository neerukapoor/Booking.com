import express from 'express'
const app = express()
const PORT = 3000
import indexRouter from './routes/index'
import adminAuthRouter from './routes/adminAuth'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '..\\.env' })

app.use(express.json())

app.use('/', indexRouter)
app.use('/admin', adminAuthRouter)

if (process.env.MONGODB_CONNECTION) {
  mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB: ' + error)
    })
} else {
  console.log('Error Connecting to MongoDb, connection string is not present')
}

app.listen(3000, () => {
  console.log(`Server listning on port ${PORT}`)
})

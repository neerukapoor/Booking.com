import express from 'express'
const app = express()
const PORT = 3000
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '..\\.env' })

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

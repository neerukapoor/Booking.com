import express from 'express'
const router = express.Router()
var jwt = require('jsonwebtoken')
require('dotenv').config()
import { User } from '../db/adminDb'
import { z } from 'zod'

let inputProps = z.object({
  username: z.string().min(1),
  password: z.string().min(5),
})

type UserSchema = z.infer<typeof inputProps>

router.post('/signup', async (req, res) => {
  try {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }
    const admin: UserSchema = req.body
    const username = admin.username
    const password = admin.password
    const userAlreadyExist = await User.findOne({ username })
    if (userAlreadyExist) {
      return res.status(500).json({ message: 'User already present' })
    }
    const user = await new User({
      username,
      password,
    })

    const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    await user.save()
    res.status(200).json({ message: 'Singup Successful', jwtToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occured while Signing Up' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }

    const admin: UserSchema = req.body
    const username = admin.username
    const password = admin.password
    const existingUser = await User.findOne({ username, password })
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: 'Either Username or password is not correct ' })
    }
    const user = await new User({
      username,
      password,
    })
    const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ message: 'Login Successfully', jwtToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occured while Login up' })
  }
})

export default router

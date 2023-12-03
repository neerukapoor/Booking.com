import express from 'express'
import z from 'zod'
import { User, UserDoc } from '../db/adminDb'
import jwt, { Secret } from 'jsonwebtoken'
require('dotenv').config({ path: '../.env' })

let inputProps = z.object({
  username: z.string().min(1),
  password: z.string().min(5),
})

const SECRET_KEY: Secret = process.env.JWT_SECRET as string
type UserSchema = z.infer<typeof inputProps>

const functionn = (newUser:UserDoc) => {
  const id = newUser._id
  jwt.sign({id}, SECRET_KEY, {
    expiresIn: '1h'
  })
} 

const signup = async (req: express.Request, res: express.Response) => {
  try {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }
    const newUser = await User.create(req.body)
    functionn(newUser)
    const jwtToken = jwt.sign({ newUser }, SECRET_KEY, {
      expiresIn: '1h',
    })
    res.status(200).json({ message: 'Singup Successful', jwtToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occured while Signing Up' })
  }
}

const login = async (req: express.Request, res: express.Response) => {
  try {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }

    const admin: UserSchema = req.body
    const username = admin.username
    const password = admin.password
    const existingUser = await User.findOne({ username }).select('+password')
    if (
      !existingUser ||
      !existingUser.correctPassword(password, existingUser.password)
    ) {
      return res
        .status(401)
        .json({ error: 'Either Username or password is not correct ' })
    }
    const user = new User({
      username,
      password,
    })
    const jwtToken = jwt.sign({ user }, SECRET_KEY, {
      expiresIn: '1h',
    })
    res.status(200).json({ message: 'Login Successfully', jwtToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occured while Login up' })
  }
}

export default {
  signup,
  login,
}

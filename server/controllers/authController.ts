import express from 'express'
import z from 'zod'
import { User, UserDocument } from '../db/adminDb'
import jwt from 'jsonwebtoken'

let inputProps = z.object({
  username: z.string().min(1),
  password: z.string().min(5),
})

type UserSchema = z.infer<typeof inputProps>

const sendUserToken = (
  user: UserDocument,
  statusCode: number,
  res: express.Response
) => {
  const id = user._id
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRESIN,
  })
  res.status(statusCode).json({ status: 'success', token })
}

const signup = async (req: express.Request, res: express.Response) => {
  try {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }
    const newUser = await User.create(req.body)

    sendUserToken(newUser, 201, res)
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
    sendUserToken(existingUser, 200, res)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occured while Login up' })
  }
}

export default {
  signup,
  login,
}

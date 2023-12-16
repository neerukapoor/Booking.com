import express from 'express'
import z from 'zod'
import { User, UserDocument } from '../db/adminDb'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
)

const google = async (req: express.Request, res: express.Response) => {
  try {
    const response = await oAuth2Client.verifyIdToken({
      idToken: req.body.credential,
      audience: req.body.clientId,
    })
    const payload = response.getPayload()
    if (!payload?.email_verified) {
      throw Error
    }
    const email = payload.email
    const user = await User.findOne({ email })
    if (user) {
      if (user.loginType === 'e') {
        user.loginType = 'eg'
        user.save({ validateBeforeSave: false })
      }
      sendUserToken(user, 201, res)
    } else {
      const newUser = await User.create({
        email,
        password: 'password',
        loginType: 'g',
      })
      sendUserToken(newUser, 201, res)
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'An error occured while Signing with Google' })
  }
}

let inputProps = z.object({
  email: z.string().min(1),
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
    const email = admin.email
    const password = admin.password
    const existingUser = await User.findOne({ email }).select('+password')
    if (
      !existingUser ||
      !existingUser.correctPassword(password, existingUser.password)
    ) {
      return res
        .status(401)
        .json({ error: 'Either email or password is not correct ' })
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
  google,
}

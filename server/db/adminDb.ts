import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

interface IUser {
  email: string
  password: string
  loginType: string
}

export interface UserDocument extends IUser {
  _id: mongoose.Types.ObjectId
}

interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: [true, 'Please provide your email!'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    require: [true, 'Please provide a password!'],
    select: false,
  },
  loginType: {
    type: String,
    enum: ['e', 'eg', 'g'],
    default: 'e',
    select: false,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

userSchema.method(
  'correctPassword',
  async function correctPassword(
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword)
  }
)

export const User = mongoose.model<IUser, UserModel>('User', userSchema)

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
  username: string
  password: string
}

interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    require: [true, 'Please provide your username!'],
  },
  password: { type: String, require: [true, 'Please provide a password!'] },
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

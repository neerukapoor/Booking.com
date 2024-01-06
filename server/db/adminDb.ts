import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

interface IRoom {
  roomId: string;
  Status: string;
  cost: number;
  roomType: string;
}

interface IUser {
  email: string
  password: string
  loginType: string
  hotels: {
    hotelName: string;
    location: string;
    rooms: IRoom[];
  }[];
}

export interface UserDocument extends IUser {
  _id: mongoose.Types.ObjectId
}

interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>

const RoomStatus = {
  Reserved: 'reserved',
  Available: 'available',
  Unavailable: 'unavailable'
}

const RoomType = {
  Delux: 'delux',
  SingleRoom: 'singleRoom',
  DoubleRoom: 'doubleRoom'
}

const RoomSchema = new mongoose.Schema({
  roomId: {type: String},
  Status: {
    type: String, 
    enum: RoomStatus,
    default: 'available'},
  cost: {
    type: Number,
    require: [true, 'Please provide cost!'],
  },
  roomType: {
    type: String,
    enum: RoomType,
    require: [true, 'Please provide room type!'],
  }
})

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String },
  location: {type: String},
  random: {type: String},
  rooms: [RoomSchema]
});

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
  hotels: [hotelSchema]
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

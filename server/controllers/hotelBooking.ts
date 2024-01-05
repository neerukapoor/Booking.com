import express from 'express'
import {User} from '../db/adminDb'
import z from 'zod'

let inputProps = z.object({
    hotelName: z.string().min(1),
    location: z.string().min(5),
})
  
type hotelSchema = z.infer<typeof inputProps>
  
const booking = async (req: express.Request, res: express.Response) => {
    const parsedInput = inputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }

    const idFromHeader = req.headers["id"];
    const admin = await User.findOne({_id: idFromHeader});
    if(!admin) {
        return res.status(404).json({error: "User not found"});
    }
    const hotel:hotelSchema = req.body;
    admin.hotels.push(hotel)
    const updatedAdminData = await admin.save();
    res.json({Admin:updatedAdminData});
}

export default{
    booking
}
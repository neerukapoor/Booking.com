import express from 'express'
import {User} from '../db/adminDb'
import z, { string } from 'zod'

let inputProps = z.object({
    hotelName: z.string().min(1),
    location: z.string().min(5),
    room: z.optional(z.array(z.string()))
})

const validRoomTypes = ["delux", "doubleRoom", "singleRoom"];

let roomInputProps = z.object({
    hotelName: z.string().min(1),
    roomId: z.string().min(1),
    cost: z.number().refine((value) => value >= 0, {
        message: "Cost must be positive",
    }),
    roomType: z.string().refine((value) => validRoomTypes.includes(value), {
        message: "Invalid room type. Please enter delux, singleRoom, doubleRoom",
    }),
    roomStatus: z.string().optional()
})
  
const reserveRoomInputProps = z.object({
    hotelName: z.string().min(1),
    roomId: z.string().min(1)
})

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
    const hotel = req.body;
    admin.hotels.push(hotel)
    const updatedAdminData = await admin.save();
    res.json({Admin:updatedAdminData});
}

const addRoom = async(req: express.Request, res:express.Response) => {
    const parsedInput = roomInputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }

    const idFromHeader = req.headers["id"];
    const admin = await User.findOne({_id: idFromHeader});
    if(!admin) {
        return res.status(404).json({error: "User not found"})
    }
    const room = req.body;
    const desiredHotelName = room.hotelName;
    const roomId = room.roomId
    const existingHotel = admin.hotels.find(hotel => hotel.hotelName === desiredHotelName);
    if(!existingHotel) {
        return res.status(404).json({error: "Hotel does not exist"});
    }
    if(existingHotel.rooms.find((room) => room.roomId === roomId)) {
        return res.status(409).json({message: "Room with this Id already present"})
    }
    existingHotel.rooms.push(room)
    try {
        await admin.save();
        console.log("Admin with updated hotel and room saved:", admin);
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error saving admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const reserveRoom = async(req:express.Request, res:express.Response) => {
    const parsedInput = reserveRoomInputProps.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(400).json({ msg: parsedInput.error })
    }

    const idFromHeader = req.headers["id"];
    const admin = await User.findOne({_id: idFromHeader});
    if(!admin) {
        return res.status(404).json({error: "User not found"});
    }

    const hotelName = req.body.hotelName;
    const roomId = req.body.roomId;
    const existingHotel = admin.hotels.find(hotel => hotel.hotelName === hotelName);
    if(!existingHotel) {
        return res.status(404).json({error: "Hotel does not exist"});
    }
    const existingRoom = existingHotel.rooms.find((room) => room.roomId === roomId)
    console.log(existingHotel)
    if(!existingRoom) {
        return res.status(404).json({error: "Room with given Id does not exist"});
    }
    if(existingRoom.Status === "reserved" || existingRoom.Status === "unavailable") {
        return res.status(400).json({ error: "Room is already booked or unavailable" });
    }
    existingRoom.Status = 'reserved';
    try {
        await admin.save();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default{
    booking,
    addRoom,
    reserveRoom
}
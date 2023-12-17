import express from 'express'
import {User} from '../db/adminDb'

const isLoggedIn = async (req: express.Request, res: express.Response) => {
    const idFromHeader = req.headers["id"];
    const user = await User.findOne({_id: idFromHeader});
    if(user) {  
        return res.json({user})
    }
    res.json({message: "Not logged in"})
  }

export default {isLoggedIn}
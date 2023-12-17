import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';

export const authenticateAdminJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("jwtToken");
    console.log(accessToken);
    if(accessToken) {
        const token = accessToken.split(' ')[1];
        if(!process.env.JWT_SECRET)
            return res.status(403).json({message: "Got Authentication Error, jwt secret not present"});
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err)
            {
                return res.status(403).json({message: "Got Authentication Error"});
            }
            if(!data)
                return res.status(403).json({message: "Got Authentication Error, data is undefined"});
            if(typeof data === "string")
                return res.status(403).json({message: "Got Authentication Error, data is type of string"});
            req.headers["id"] = data.id;
            next();
        })
    }
    else {
        res.status(404).json({message: "Provide Jwt token"})
    }
}
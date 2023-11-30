import express from 'express'
const router = express.Router();

router.get("/", async(req,res) => {
    res.send("sdlfn");
})

router.post("/signup", async(req,res) => {
    const {username, password} = req.body
    console.log(username);
    console.log(password);
    res.send("yoadsfi");
})

export default router;
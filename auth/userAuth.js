const userModel = require("../models/userModel")
const router = require("express").Router()
const bcrypt = require("bcrypt")


//register
router.post("/register",async (req,res)=>{
    let {username, email, password} = req.body
    let user = await userModel.findOne({username})
    if(!user){
        const hash = bcrypt.hashSync(password, 10);
        await userModel.create({
            username,
            email,
            password:hash
        })
        return res.redirect("/login")
    }
    res.send("Please login you already exists")
})


//login
router.post("/login", async (req,res)=>{
    let {username, password} = req.body
    let user = await userModel.findOne({username})
    if(user && bcrypt.compareSync(password, user.password)){
        req.session.userId = user._id
        return res.redirect("/dashboard")
    }
    res.redirect("/login")
})


//logout
router.get("/logout", (req,res)=>{
    if(req.session && req.session.userId){
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Failed to logout. Please try again.");
            }
            res.clearCookie('connect.sid', { path: '/' })
            return res.redirect("/login")
        });
    }else{
        return res.redirect("/login")
    }
})

module.exports = router
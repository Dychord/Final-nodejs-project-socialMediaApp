const router = require("express").Router()
const isAuth =  require("../middlewares/userMiddleware")
const userModel = require("../models/userModel")

router.get("/register", (req,res)=>{
    res.render("register")
})
router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/dashboard", isAuth,async (req,res)=>{
    let user = await userModel.findById(req.session.userId)
    res.render("dashboard",{user})
})

module.exports = router
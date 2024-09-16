const router = require("express").Router()
const isAuth =  require("../middlewares/userMiddleware")
const userModel = require("../models/userModel")
const postModel = require("../models/postModel")


router.get("/register", (req,res)=>{
    res.render("register")
})
router.get("/login", (req,res)=>{
    res.render("login")
})

router.get("/dashboard",async (req,res)=>{
    let user = await userModel.findById(req.session.userId)
    let posts = await postModel.find()
    res.render("dashboard", {currentRoute: 'dashboard'})
})

router.get("/profile",async (req,res)=>{
    res.render("profile", {currentRoute : 'profile'})
})
router.get("/settings",async (req,res)=>{
    res.render("settings", {currentRoute: 'settings'})
})
router.get("/notifications",async (req,res)=>{
    res.render("notifications", {currentRoute: 'notifications'})
})
router.get("/messages",async (req,res)=>{
    res.render("messages")
})



module.exports = router
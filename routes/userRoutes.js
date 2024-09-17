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
    if(!req.session.userId){
        req.session.userId = '66e72eb8a8b9d81509a63d56'
    }
    let user = await userModel.findOne({_id: req.session.userId});
    let allUsers = await userModel.find({})
    let posts = await postModel.find()

    

    res.render("dashboard", {currentRoute: 'dashboard',user, posts, allUsers})   
})

router.get("/profile",async (req,res)=>{
    res.render("profile", {currentRoute : 'profile'})
})
router.get("/settings",async (req,res)=>{
    // if(!req.session.userId){
    //     req.session.userId = '66e72eb8a8b9d81509a63d56'
    // }
    let user = await userModel.findOne({_id: req.session.userId});
    res.render("settings", {currentRoute: 'settings',user})
})
router.get("/notifications",async (req,res)=>{
    // if(!req.session.userId){
    //     req.session.userId = '66e72eb8a8b9d81509a63d56'
    // }
    let allUsers = await userModel.find({})
    let posts = await postModel.find()
    let user = await userModel.findOne({_id: req.session.userId});
    res.render("notifications", {currentRoute: 'notifications', user, allUsers, posts})
})
router.get("/messages",async (req,res)=>{
    res.render("messages")
})



module.exports = router
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
    res.render("dashboard")
})

module.exports = router
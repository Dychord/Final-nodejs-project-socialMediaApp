const router = require("express").Router()
const postModel = require("../models/postModel")

router.post("/create", async (req,res)=>{
    let { desc, img } = req.body;
    let post = await postModel.create({
        desc,
        img,
        userId:req.session.userId
    })
    res.redirect("/dashboard")
})


module.exports = router
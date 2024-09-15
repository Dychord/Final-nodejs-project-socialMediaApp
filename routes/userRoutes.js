const router = require("express").Router()

router.get("/about", (req,res)=>{
    res.send("About us page")
})
router.get("/", (req,res)=>{
    res.send("")
})

module.exports = router
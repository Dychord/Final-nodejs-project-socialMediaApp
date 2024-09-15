const router = require("express").Router()

router.get("/about", (req,res)=>{
    res.send("About us page")
})

module.exports = router
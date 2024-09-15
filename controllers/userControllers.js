const userModel = require("../models/userModel")
const router = require("express").Router()


router.post("/follow/:id", async (req,res)=>{
    let anotherUser = await userModel.findById(req.params.id)
    let currentUser = await userModel.findById(req.session.userId)

    if(currentUser._id.equals(anotherUser._id)) return res.send("You can't follow yourself")
    else{
        if(currentUser.following.includes(anotherUser._id)) return res.send(`You already follow ${anotherUser.username}`)
        else{
            await currentUser.updateOne({$push: {following: anotherUser._id}})
            await anotherUser.updateOne({$push: {followers: currentUser._id}})
            return res.send(`You follow ${anotherUser.username} now`)
        }
    }

})

router.post("/unfollow/:id", async (req,res)=>{
    let anotherUser = await userModel.findById(req.params.id)
    let currentUser = await userModel.findById(req.session.userId)

    if(currentUser._id.equals(anotherUser._id)) return res.send("You can't follow yourself")
    else{
        if(!currentUser.following.includes(anotherUser._id)) return res.send(`You first need to follow ${anotherUser.username}`)
        else{
            await currentUser.updateOne({$pull: {following: anotherUser._id}})
            await anotherUser.updateOne({$pull: {followers: currentUser._id}})
            return res.send(`You've unfollowed ${anotherUser.username} `)
        }
    }
})


// -------------------------------

router.delete("/delete/:id",async (req,res)=>{
    const user = await userModel.findOneAndDelete({_id: req.params.id})
    if(!user){
        return res.send("No user exists or already deleted")
    }
    return res.send(`${user.username} deleted`)
})

router.get("/users", async (req,res)=>{
    let user = await userModel.find()
    res.send(user)
})


module.exports = router
const router = require("express").Router()
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

router.post("/create", async (req,res)=>{
    let { desc, img } = req.body;
    let post = await postModel.create({
        desc,
        img,
        userId:req.session.userId
    })
    res.redirect("/dashboard")
})

router.post("/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.session.userId;
    try {
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send("You don't exist. You need to login first.");
        }
        // Find and update the post with the new comment
        const post = await postModel.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        userId,
                        text,
                        timestamp: new Date()
                    }
                }
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        // Redirect to the dashboard after updating
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding comment");
    }
});

//delete a post
router.post("/:id/comments/delete", async (req, res) => {
    await postModel.findByIdAndDelete(req.params.id)
    res.redirect("/dashboard")
})

// router.post("/:id/comments", async (req,res)=>{
//     const postId = req.params.id;
//     const { text } = req.body;
//     const userId = req.session.userId;

//     let user = await userModel.findById(req.session.userId)

//     if(!user) res.send("You don't exists, you need to login first")
//     else{
//         let post = await postModel.findOneAndUpdate(
//             postId,
//             {
//                 $push: {
//                     comments: {
//                         userId,
//                         text,
//                         timestamp: new Date()
//                     }
//                 }
//             },
//             { new: true }
//         )
//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }
//         res.redirect("/login")
//     }
//     return res.redirect("/dashboard");

// })




module.exports = router
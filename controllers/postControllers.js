const router = require("express").Router()
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const multer = require('multer');

// Set up multer to store files in memory
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });


router.post("/create/:userid", upload.single('img'), async (req, res) => {
    try {
        const { desc } = req.body;
        // Create a new post
        const newPost = new postModel({
            userId: req.params.userid,
            desc: desc,
            img: req.file ? {
                data: req.file.buffer,       // Image data as buffer
                contentType: req.file.mimetype // Image MIME type
            } : undefined // No image if file is not provided
        });

        // Save the post to the database
        await newPost.save();
        // Update user's posts
        await userModel.updateOne(
            { _id: req.params.userid },
            { $push: { myPosts: newPost._id.toString() } },
            { new: true }
        );

        // Redirect or send response
        res.redirect("/dashboard"); // or res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/images/:id', async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (post && post.img && post.img.data) {
            res.set('Content-Type', post.img.contentType);
            res.send(post.img.data);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});


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

// ---------------Likes----------------

// router.post("/like/:id", async (req, res) => {
//     res.send("like")
// })




module.exports = router
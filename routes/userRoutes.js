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


router.get("/dashboard", isAuth,async (req, res) => {
    try {
        if (!req.session.userId) {
            // Handle cases where session userId is not set
            return res.redirect('/login')
        }
        // Populate followers when fetching user
        const user = await userModel.findById(req.session.userId)
            .populate('followers', 'username email')
            // .populate('following', 'username email') // Populate followers with username and email fields
            .exec();
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Paginate or limit results if needed
        const posts = await postModel.find().populate('userId', 'username email').sort({ createdAt: -1 }).exec();
        const allUsers = await userModel.find().exec();
        const following = await userModel.find({ _id: { $in: user.following } }).exec();

        res.render("dashboard", { currentRoute: 'dashboard', user, posts, allUsers, following });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/profile", isAuth,async (req,res)=>{
//     if(!req.session.userId){
//         req.session.userId = '66e72eb8a8b9d81509a63d56'
// }
        const user = await userModel.findById(req.session.userId)
        const posts = await postModel.find().populate('userId', 'username email').sort({ createdAt: -1 }).exec();
        const allUsers = await userModel.find().exec();
        const following = await userModel.find({ _id: { $in: user.following } }).exec()

    res.render("profile", {currentRoute : 'profile', user, posts, allUsers, following })
})
router.get("/posts", isAuth,async (req,res)=>{
//     if(!req.session.userId){
//         req.session.userId = '66e72eb8a8b9d81509a63d56'
// }
    const createPost = req.query.createPost === 'true'; // Check if createPost is true
    res.render('components/post', { showPostPopup: createPost});
})
router.get("/settings", isAuth,async (req,res)=>{
    // if(!req.session.userId){
    //     req.session.userId = '66e72eb8a8b9d81509a63d56'
    // }
    let user = await userModel.findOne({_id: req.session.userId});
    const following = await userModel.find({ _id: { $in: user.following } }).exec();

    res.render("settings", {currentRoute: 'settings',user, following})
})
router.get("/notifications", isAuth,async (req,res)=>{
    // if(!req.session.userId){
    //     req.session.userId = '66e72eb8a8b9d81509a63d56'
    // }
    let allUsers = await userModel.find({})
    let posts = await postModel.find()
    let user = await userModel.findOne({_id: req.session.userId});
    const following = await userModel.find({ _id: { $in: user.following } }).exec();

    res.render("notifications", {currentRoute: 'notifications', user, allUsers, posts, following})
})
router.get("/messages", isAuth,async (req,res)=>{
//     if(!req.session.userId){
//         req.session.userId = '66e72eb8a8b9d81509a63d56'
// }
    res.render("messages")
})



module.exports = router
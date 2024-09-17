const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Final-nodejs-project").then((res)=> console.log("User DB connected"))

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password:{
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
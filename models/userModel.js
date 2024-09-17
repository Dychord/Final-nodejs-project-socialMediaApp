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
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    myPosts:{
        type: Array,
        default:[]
    },
    requests:{
        type: Array,
        default:[]
    }
})

module.exports = mongoose.model("user", userSchema)
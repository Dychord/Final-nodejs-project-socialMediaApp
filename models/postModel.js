const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Final-nodejs-project").then((res)=> console.log("Post DB connected"))

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        max:500
    },
    img:{
        type: String,    
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[
        {
            userId: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true,
                max: 400
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
},{timestamps:true})


module.exports = mongoose.model("post", postSchema)
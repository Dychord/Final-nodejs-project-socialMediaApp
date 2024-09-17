const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Final-nodejs-project").then((res)=> console.log("Post DB connected"))

const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    desc:{
        type: String,
        max:500
    },
    img: {
        data: Buffer,       // Store image data as binary
        contentType: String // Store the MIME type of the image
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
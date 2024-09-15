const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", (req,res)=>{})



app.use("/", require("./routes/userRoutes"))

app.listen(3000, ()=> console.log("server running on port 3000"))
const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")

// Middleware setup
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret"
}));
app.get("/", (req,res)=>{})



app.use("/", require("./routes/userRoutes"))
app.use("/dashboard/", require("./routes/postRoutes"))

app.use("/", require("./auth/userAuth"))

app.use("/", require("./controllers/userControllers"))
app.use("/dashboard/post", require("./controllers/postControllers"))

app.listen(3000, ()=> console.log("server running on port 3000"))
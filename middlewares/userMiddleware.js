const isAuth = (req,res,next)=>{
    if(req.session && req.session.userId){
        next()
    }
    else{
        res.send("You need to login in order to access dashboard")
    }
}

module.exports = isAuth
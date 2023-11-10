const jwt = require("jsonwebtoken")
const User = require ("../models/user")

module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId
    User.findOne({_id:userId}).then((result) => {
      if(result){req.auth = {
        userId: userId,
        role: result.role
      }
      next()}
      else{
        res.status(404).json({error:"user does not exist"})
      }
    })
    
    
  } catch (error) {
    res.status(401).json({error:"You have to sign in !"})
  }
}

module.exports.isAdmin=(req,res,next) =>{
    try{
      if(req.auth.role ==="admin"){
        next()
      }else{
        res.status(403).json({error :"No access for this route"})
      }
    }catch(e){
      res.status(401).json({error:error.message})
    }
}

module.exports.isAuthor=(req,res,next) =>{
  try{
    if(req.auth.role ==="author"){
      next()
    }else{
      res.status(403).json({error :"No access for this route"})
    }
  }catch(e){
    res.status(401).json({error:error.message})
  }
}
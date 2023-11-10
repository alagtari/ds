const jwt = require("jsonwebtoken")

module.exports.isOwner=(req,res,next) =>{
    try{
      if(req.auth.publications.includes(req.params.id)){
        next()
      }else{
        res.status(403).json({error :"No access for this route"})
      }
    }catch(e){
      res.status(401).json({error:error.message})
    }
  }
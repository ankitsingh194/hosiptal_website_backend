const jwt = require('jsonwebtoken');
const DoctorSchema = require('../Models/DoctorSchema');
const User = require('../Models/UserSchema');
const { use } = require('../Route/doctorRoute');



module.exports = { 
    authenticate : async(req,res,next) => {
    // get token from headers
    console.log('socjjjjjjjjjj')
    const authToken = req.headers.authorization
    console.log(authToken,'socjjjjjjjjjj')
    // check token is exists 
    if(!authToken ){
        return res.status(401).json({success:false,message:'User not authorize '})
    }

    try{
      //  console.log(response)
      const token = authToken.split(" ")[1];
      const response =  jwt.verify(token, process.env.JWT_SEC)
      console.log(response)
      req.userid = response.id
        next()
    }catch(err){
        if(err.name  === 'TokenExpiredError'){
            return res.status(401).json({message:"Token is expired "})
        }


        return res.status(401).json({message:"Token is invalid  "})



    }


   },
   restrict : roles => async(req,res,next)=>{
     const userId = req.userid

     let user;

     const patient = await User.findById(userId)
     const doctor = await DoctorSchema.findById(userId)

     if(patient){
        user = patient
     }
     if(doctor){
        user = doctor
     }

     if(!roles.includes(user.role)){
        return res.status(401).json({success:false,message:"You're not authorized"})
     }
     next()


   }
}

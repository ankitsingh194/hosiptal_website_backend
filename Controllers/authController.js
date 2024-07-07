const Doctor = require('../Models/DoctorSchema')
const User = require('../Models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = UserController = {
    Regiser: async(req ,res)=>{
        const {email,password,name,bloodType,role,photo,gender} = req.body
        console.log({email})
        try {

            let user = null
            if(role === 'patient'){
                user = await User.findOne({email})
            }else if(role ===  'doctor'){
                user = await Doctor.findOne({email})
            }

            if(user){
                return res.status(400).json({message:"User already exist"})
            }

            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password , salt)


            if(role === 'patient'){
                user = new User({
                    name,
                    email,
                    password:hashPassword,
                    photo,
                    gender,
                    bloodType,
                    role
                })
            }

            if(role === 'doctor'){
                user = new Doctor({
                    name,
                    email,
                    password:hashPassword,
                    photo,
                    gender,
                    role
                })
            } 


            await user.save()

            res.status(200).json({success:true, message:'User successfully created'})
            
        } catch (error) {
            res.status(400).json({success:false, message:' Error User not created'})

            
        }
    },

    loginUser: async(req,res)=>{
        const {email, password} = req.body
        console.log(email)

        try{

        const response = await User.findOne({email})
        const salt = await bcrypt.genSalt(10)
        const match = await bcrypt.compare(password , response.password);
        console.log(match)

        if(match == true){
            const userToken = jwt.sign(
                {
                    id:response.id
                },process.env.JWT_SEC, {expiresIn:"3d"}
            );
         
            const {password, __v, createdAt,updatedAt, ...userData} = response._doc;

            res.status(200).json({...userData ,token:userToken})
            return;
            
            

        } else {

            res.status(400).json({success:false , message:'Password is not correct '})

        }
    } catch(err){
        res.status(400).json({success:false , message:'Password & email id is not correct '})

    }

    }

   
}
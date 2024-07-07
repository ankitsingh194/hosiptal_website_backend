const BookingSchema = require('../Models/BookingSchema')
const DoctorSchema = require('../Models/DoctorSchema')
const User = require('../Models/UserSchema')

module.exports  = {
    updateUser : async(req, res) =>{
        const id  = req.params.id
        try{
            const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
            res.status(200).json({success:true, message:'Sucessfully update', data:updateUser})
        } catch(error){
            res.status(400).json({success:false, message:'Error user did not Sucessfully update',})

        }

    },
    getSingleUser: async(req,res)=>{
        const {id} = req.params
        try {
            const singleUser = await User.findById(id)
            if(!singleUser){
                res.status(400).json({success:false, message:'Error user  id did not match please correct the id',})
                return;
            }

            const { password, ...rest} = singleUser._doc;
            res.status(200).json({success:true, message:'Sucessfull', data:{ ...rest }})
            return;

            
        } catch (error) {
            res.status(404).json({success:false, message:'Error  while fetching user info',})
            return;
        }
    },

    getDoctorProfile : async(req,res)=>{
        const userid = req.userId;
    
        try{
            const userprofile = await User.findById(userid);
    
            if(!userprofile){
                return res.status(404).json({success:true, message:"Doctor not found"});
            }
    
            const { password, ...rest} = userprofile._doc;
    
            const appointments = await BookingSchema.find({user: userid})
    
            res.status(200).json({success:true,message:true,data:{...rest},})
        } catch (err){
            res.status(500).json({success:false, message:"Something went worng, cannot get"});
        }
    
    
    
    },

    getMyAppointments : async(req,res) =>{
        
        try {

            const appointmet = await BookingSchema.find({user:req.params.userid})


            const doctorids = appointmet.map(el=>el.doctor.id)


            const doctors = await DoctorSchema.find({_id: { $in:doctorids}}).select('-password')


            res.status(200).json({success:true, message:"Appointments are getting",data:doctors })

            
        } catch (error) {
            
        }
    },


    getallUser: async(req,res)=>{
        try {
            const allUser = await User.find({});
            res.status(200).json({success:true, message:'Sucessfull', data:allUser})
            return;
            
        } catch (error) {
            res.status(404).json({success:false, message:'Error  while fetching user info',})
            return;
        }
    },
    deleteSingleUser: async (req,res) =>{
        const {id} = req.params
        try {
            const allUser = await User.findByIdAndDelete(id);
            res.status(200).json({success:true, message:'Sucessfull', })
            return;
            
        } catch (error) {
            res.status(404).json({success:false, message:'Error  while deleting user info',})
            return;
        }

    }

}
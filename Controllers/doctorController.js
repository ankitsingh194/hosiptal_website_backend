const BookingSchema = require("../Models/BookingSchema");
const DoctorSchema = require("../Models/DoctorSchema");
const { Regiser } = require("./authController");

module.exports = DoctorController ={
    RegiserDoctor:async(req,res) =>{
        const {email, password,name} = req.body
        console.log({email})
        try {

            let doctor =  await DoctorSchema.findOne({email}) 
            
            if(doctor != null){
                return res.status(400).json({Message:' Doctor is already Registerd'})
               
            }
         

            const Doctor = new DoctorSchema(req.body)
            console.log(Doctor)

             await Doctor.save()

            return res.status(200).json({success:true, Message:' Doctor is  Registerd Succesfully'})
            
        } catch (error) {
           return res.status(400).json({success:false, message:' Error Doctor not Registerd'})
        }
    },

    GetSingleDoctor: async(req,res)=>{
        const {id }= req.params
        console.log(id)
        try {

            const data = await DoctorSchema.findById(id)
            console.log(data)

            if(data === null){
             return res.status(400).json({message:'Doctor does not exist'})

            }

            return res.status(200).json(data)
            
        } catch (error) {
           return res.status(400).json({message:'somthing went worng',error})
            
        }

        

    },

    
    DoctorUpdate: async(req,res)=>{
        const {id} = req.params

        try {
            const data = await DoctorSchema.findByIdAndUpdate(id,req.body)

            
            if(data === null){
                return res.status(400).json({message:'Doctor does not exist'})
   
               }

            return res.status(200).json(data)


            
        } catch (error) {
            return res.status(400).json({message:'somthing went worng',error})
            
        }
    },
    DeleteDoctor: async(req,res)=>{
        const {id} = req.params

        try {
            const data = await User.findByIdAndDelete(id)

            return res.status(200).json({success:true, message:'Doctor is Deleted successfully'})


            
        } catch (error) {
            return res.status(400).json({message:'somthing went worng',error})
            
        }
    },
    SearchDoctor: async(req,res) => {
    try{
        const query = req.params.key;
        console.log(query)
        let doctor;

        if(query){
         doctor = await DoctorSchema.find(
            
                {
                    isApproved:'approved',
                    
                    
                        $or:[
                            {name:{$regex:query, $options:'i'}},
                            {specialization:{$regex:query, $options:'i'}},
                         
                        ]
                 
             


        }).populate('reviews').select("-password");
        console.log(doctor)  
        res.status(200).json( {success:true, message:"Doctor found", doctor})
    } else {
        doctor = await DoctorSchema.find({isApproved:'approved'}).select("-password");
        res.status(200).json( {success:true, message:"Doctor found", doctor})
    }
} catch(err){
    res.status(400).json({success:'false', message:'User dose not found Error'})
}

},

getDoctorProfile : async(req,res)=>{
    const doctorId = req.userId;

    try{
        const doctor = await DoctorSchema.findById(doctorId);

        if(!doctor){
            return res.status(404).json({success:true, message:"Doctor not found"});
        }

        const { password, ...rest} = doctor._doc;

        const appointments = await BookingSchema.find({doctor: doctorId})

        res.status(200).json({success:true,message:true,data:{...rest},})
    } catch (err){
        res.status(500).json({success:false, message:"Something went worng, cannot get"});
    }



}

    
    


}
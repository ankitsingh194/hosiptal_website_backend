const  BookingSchema  = require("../Models/BookingSchema");
const DoctorSchema = require("../Models/DoctorSchema");


module.exports = {
    AddBooking: async ( req,res)=> {
        if(!req.body.doctor) req.body.doctor = req.params.doctorid
        if(!req.body.user) req.body.user = req.userid
        console.log(req.body)
        
      
        try {
            const booking = await BookingSchema.create(req.body)

            await DoctorSchema.findByIdAndUpdate(req.body.doctor,{
                $push:{appointments:booking._id}
            })

            res.status(200).json({success:true, message:"Booking is succesfull" , data:booking})
            
            
        } catch (error) {
            res.status(400).json({success:true, message:"Booking is not succesfull" , data:error})
            
        }

    }
}


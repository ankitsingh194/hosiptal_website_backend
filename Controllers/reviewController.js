const ReviewSchema = require('../Models/ReviewSchema')
const DoctorSchema = require('../Models/DoctorSchema');
const reviewSchema = require('../Models/ReviewSchema');




module.exports = {
    getAllReviews : async (req,res)=>{

        try {
            const reviews = await ReviewSchema.find({});

            res.status(200).json({success:true , message:'Successful', data:reviews})
        } catch (error) {
            res.status(404).json({success:false, message:"Not found"})
            
        }

    },
    createReview : async(req,res)=>{
        if(!req.body.doctor) req.body.doctor = req.params.doctorId
        if(!req.body.user) req.body.user = req.userid
        console.log(req.body)


       // const newReview = await ReviewSchema.create(req.body)
      //  console.log(newReview,'gggegeg')

        try {
            console.log('hello')
            const newReview = await ReviewSchema.create(req.body) 
            
            await DoctorSchema.findByIdAndUpdate(req.body.doctor, {
                $push:{reviews:newReview._id}
                
            })

            res.status(200).json({success:true, message:'Review submitted',data:newReview})
        } catch (error) {
            res.status(500).json({success:false, message:'Review not submitted', data:error})
            
        }

    }
}
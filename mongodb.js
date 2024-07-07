const mongoose = require('mongoose')

//database connecting function
const mongodbconnect = async() =>{
  try {

    await mongoose.connect(process.env.MONGO_URL,{
       // useNewUrlParser:true,
       // useUnifiedTopolog:true,
    } ).then(()=> {console.log('mongoose is connected to db')}).catch(()=> {console.log('mongoose is not connected to db')})
    
  } catch (error) {
    console.log(error)
    
  }

}










module.exports = mongodbconnect;
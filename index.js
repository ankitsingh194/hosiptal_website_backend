const express = require('express');
const cros = require('cors');
const cookieParser = require('cookie-parser');
const mongodbconnect = require('./mongodb');
const authRoute = require('./Route/authRoute')
const DoctorRouter = require('./Route/doctorRoute')
const UserRouteer = require('./Route/user')
const bookingRouter = require('./Route/bookingRoute')

require('dotenv').config()

const UrlList = ['http://localhost:5173']

const app = express();

app.use(cookieParser())
app.use(cros(UrlList));
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

app.use('/v1/api', authRoute )
app.use('/v1/api', DoctorRouter )
app.use('/v1/api', UserRouteer )
app.use('/v1/api', bookingRouter )

mongodbconnect();

app.get('/hello', (req ,res) => {
    console.log('Hello')
    res.status(200).json('Hllo')
})



app.listen( PORT, ()=> {console.log(`server is running ${PORT} `)})
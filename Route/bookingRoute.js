const express = require('express')
const bookingController = require('../Controllers/bookingController')
const middleware = require('../Auth/verifyToken')
const Router = express.Router();

Router.use(middleware.authenticate)
Router.post('/addbooking/:doctorid',bookingController.AddBooking );

module.exports = Router;
const express = require('express')
const doctorController = require('../Controllers/doctorController')
const UserAuthanticate  = require('../Auth/verifyToken')
const reviewRouter = require('./review')

const Router = express.Router()

Router.use('/:doctorId/review', reviewRouter)

Router.post('/register',   doctorController.RegiserDoctor)
Router.post('/search/:key', doctorController.SearchDoctor)
Router.get('/singledoctor/:id' ,doctorController.GetSingleDoctor);
Router.put('/updatedoctor/:id',UserAuthanticate.restrict(['doctor']) ,doctorController.DoctorUpdate);
Router.delete('/deletedoctor',UserAuthanticate.restrict(['doctor']) ,doctorController.DeleteDoctor);
Router.get('/doctorprofile/me' , UserAuthanticate.authenticate,UserAuthanticate.restrict(['doctor']), doctorController.getDoctorProfile);


module.exports = Router;
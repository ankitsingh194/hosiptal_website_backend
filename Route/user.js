const express = require('express');
const  userController  = require('../Controllers/usersController');
const UserAuthanticate = require('../Auth/verifyToken');

const Router = express.Router()
Router.use(UserAuthanticate.authenticate)

Router.put('/update/:id', userController.updateUser);
Router.get('/singleUser/:id', UserAuthanticate.restrict(['patient']),userController.getSingleUser);
Router.get('/allUser', UserAuthanticate.restrict(['patient']),UserAuthanticate.restrict(['admin']) , userController.getallUser),
Router.get('/appointmet', UserAuthanticate.restrict(['patient']) , userController.getMyAppointments),
Router.delete('/deletesingleUser/:id',UserAuthanticate.restrict(['patient']) ,userController.deleteSingleUser);





module.exports = Router;
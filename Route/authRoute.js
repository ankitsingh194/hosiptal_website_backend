const express = require('express')
const UserController = require('../Controllers/authController');
const Router = express.Router()


Router.post('/addUser', UserController.Regiser),
Router.post('/login', UserController.loginUser),



module.exports = Router;
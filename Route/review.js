const express = require('express')
const reviewController = require('../Controllers/reviewController')
const middelware = require('../Auth/verifyToken')

const Router = express.Router({mergeParams: true})


Router.route('/').get(reviewController.getAllReviews).post(middelware.authenticate,middelware.restrict(['patient']) ,reviewController.createReview )


module.exports = Router;
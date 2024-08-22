const express = require('express');
const router = express.Router();
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');


// /api/v1/flights
router
    .post('/',
    FlightMiddlewares.validateCreateRequest,  //calling middleware
    FlightController.createFlight);

    router
    .get('/',
    FlightController.getAllFlights);

    router
    .get('/:id',
        FlightController.getFlight);

    // /api/v1/flights/id/seats  //patch

    router
    .patch('/:id/seats',
        FlightMiddlewares.validaeUpdateSeatsRequest,
        FlightController.updateSeats
    )


module.exports = router;
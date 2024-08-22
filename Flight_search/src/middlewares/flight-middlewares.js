const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'flightNumber not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'AirplaneId not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'departureAirportId not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'arrivalAirportId not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'arrivalTime not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'DepartureTime not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.price || req.body.price<0){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = {explanation : 'price not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }


    next();
}


function validaeUpdateSeatsRequest(req,res,next){
    
    if(!req.body.seats){
        ErrorResponse.message = 'Something went wrong while updatingflight';
        ErrorResponse.error = {explanation : 'seat not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest ,
    validaeUpdateSeatsRequest
}


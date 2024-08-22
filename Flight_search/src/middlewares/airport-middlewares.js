const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = {explanation : 'Name not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = {explanation : 'Code not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = {explanation : 'CityId not found in the incoming request'}
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }


    next();
}

module.exports = {
    validateCreateRequest 
}


const { StatusCodes } = require('http-status-codes');
const {CityService} = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

/**
 * POST: /cities
 * req-body: {name: "london"}
 */

async function createCity(req,res){
    try{
        const city = await CityService.createCity({
          name: req.body.name
        });
        SuccessResponse.data = city;
        return  res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);

    }catch(error){
        ErrorResponse.error = error;
        return  res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function DeleteCity(req,res){
    try{
        const city = await CityService.DeleteCity(req.params.id);
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error
        res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}


async function updateCity(req,res){
    try{
        const city = await CityService.updateCity( {
            name : req.body.name
        },req.params.id )
        SuccessResponse.data = city
        res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error
        res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
       
}



module.exports = {
    createCity,
    DeleteCity,
    updateCity
}
const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const airportRepository = new AirportRepository;

async function createAirport(data){
    try{
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error){
        if(error.name == 'TypeError' ) {
            throw new AppError('Cannot create a new Airport object',StatusCodes.BAD_REQUEST);
        }            
        throw new AppError('cannot create an airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getAirports(){
    try{
        const airports = await airportRepository.getAll();
        return airports;
    }catch(error){
        throw new AppError('Cannot fetch data of all the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(data,id)
{
        try{
                const response= await airportRepository.update(data,id);
                return response;
            }
        catch(error){
      if(error.statusCode==StatusCodes.NOT_FOUND)
            {
                throw new AppError('The airport you requested to update is not present ',error.statusCode);
            }
    throw new AppError('Not able to fetch data of all the airport',StatusCodes.INTERNAL_SERVER_ERROR);

  }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}
const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const airplaneRepository = new AirplaneRepository;

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error){
        if(error.name == 'TypeError' ) {
            throw new AppError('Cannot create a new Airplane object',StatusCodes.BAD_REQUEST);
        }            
        throw new AppError('Cannot create an airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getAirplanes(){
    try{
        const airplane = await airplaneRepository.getAll();
        return airplane;
    }catch(error){
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(data,id)
{
        try{
                const response= await airplaneRepository.update(data,id);
                return response;
            }
        catch(error){
      if(error.statusCode==StatusCodes.NOT_FOUND)
            {
                throw new AppError('The airplane you requested to update is not present ',error.statusCode);
            }
    throw new AppError('Not able to fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

  }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
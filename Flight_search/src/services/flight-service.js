const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {Op}  = require('sequelize');
const flightRepository = new FlightRepository;
const compareTime = require('../utils/helpers/datetime-helpers');

async function createFlight(data){
    try{
        const result = compareTime(data.departureTime,data.arrivalTime);
        if(result==1) {throw new AppError('Time format is wrong',StatusCodes.BAD_REQUEST)};
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error){
        if(error.name == 'TypeError' ) {
            throw new AppError('Cannot create a new flight object',StatusCodes.BAD_REQUEST);
        }        
        throw new AppError('Cannot create an flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getAllFlights(query){
    let customFilter  = {};
    let sortFilter = [];
    //trips = MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //add a check  that  they are not same 
        }

    if(query.price){
        [minPrice,maxPrice]  = query.price.split('-');
        customFilter.price = {
            [Op.between] : [minPrice,(maxPrice== undefined)? 20000: maxPrice]
        }

    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers    //greater than or equal to
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between] : [query.tripDate, query.tripDate+" 23:59:00"]
        }
    }


    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter = sortFilters
    }

        console.log(customFilter,sortFilter);
        try{
            const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
            return flights;
        }catch(error){
            throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
        }

}

async function getFlight(id){
    try {
        const Flight = await flightRepository.get(id);
        return Flight;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try {
        const response  = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;

    }catch(error){
        console.log(error)
        throw new AppError('Cannot update Seats', StatusCodes.INTERNAL_SERVER_ERROR);
  
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
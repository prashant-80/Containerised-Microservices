const axios = require('axios');
const {BookingRepository} = require('../repositories')
const bookingRepository = new BookingRepository();
const db = require('../models');
const {ServerConfig,Queue} = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const {Enums} = require('../utils/common');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

async function createBooking(data){
    const transaction = await db.sequelize.transaction();
    try{
        console.log(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flight = await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        console.log(flightData);
        if(data.noofSeats>flightData.totalSeats){
            throw new AppError('Required no of seats are not available',StatusCodes.BAD_REQUEST);
        }
         const totalCost  = data.noofSeats*flightData.price;
         const bookingPayload =  {...data,totalCost}
        const booking =  await bookingRepository.create(bookingPayload,{transaction}); 
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats:data.noofSeats
        });
        await transaction.commit();
        return booking;

    }catch(error){
       await transaction.rollback();
       throw error;
    }
}

async function makePayment(data){
    console.log('inside service');
    const transaction = await db.sequelize.transaction()
    try{
        const bookingDetails = await bookingRepository.get(data.bookingId,transaction);
        console.log(bookingDetails);
        const bookingData = bookingDetails.dataValues;
        console.log(bookingData);
        if(bookingData.status == CANCELLED) {
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }
        const bookingTime = new Date(bookingData.createdAt);
        const currentTime  = new Date();
        if(currentTime-bookingTime > 3000000){
            await cancelBooking(data.bookingId);
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }
        
        if(bookingData.totalCost != data.totalCost){
            throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
     
        }
        if(bookingData.userId != data.userId){
            throw new AppError('The user corresponding to the booking doesnt match', StatusCodes.BAD_REQUEST);
   
        }
       
        // we assume here that payment is successful
        await bookingRepository.update(data.bookingId, {status: BOOKED}, transaction);
        Queue.sendData({
            recepientEmail: 'cs191297@gmail.com',
            subject: 'Flight booked',
            text: `Booking successfully done for the booking ${data.bookingId}`
        });
        await transaction.commit();
        
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
    
}


async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId, transaction);
        console.log(bookingDetails);
        const bookingData = bookingDetails.dataValues;
        console.log(bookingData)
        if(bookingData.status == CANCELLED) {
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingData.flightId}/seats`, {
            seats: bookingData.noOfSeats,
            dec: 0
        });
        await bookingRepository.update(bookingId, {status: CANCELLED}, transaction);
        await transaction.commit();

    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings() {
    try {
        console.log("Inside service")
        const time = new Date( Date.now() - 1000 * 300 ); // time 5 mins ago
        const response = await bookingRepository.cancelOldBookings(time);
        
        return response;
    } catch(error) {
        console.log(error);
    }
}


module.exports = {
    createBooking,
    makePayment,
    cancelBooking,
    cancelOldBookings
}
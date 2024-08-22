const express = require('express');
const router = express.Router();
const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares');



router.post('/',
CityMiddlewares.validateCreateRequest,
CityController.createCity);

router.delete('/:id',
CityController.DeleteCity);


router.patch('/:id',
CityController.updateCity);


module.exports =  router;


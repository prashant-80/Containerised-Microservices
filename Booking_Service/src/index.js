const express = require('express');

const { ServerConfig,Queue } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());   //help to parse the incoming request body 
app.use(express.urlencoded({extended:true}));  


app.use('/api', apiRoutes);

const axios = require('axios');

// Define the flight service route
//testing docker network and inter container communication
app.get('/Callingflightservice', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.FLIGHT_SERVICE}/api/v1/info`);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling flight service:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await Queue.connectQueue()
    console.log('queue is up')
});

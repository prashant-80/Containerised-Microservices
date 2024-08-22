const express  = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const app = express();
const path = require('path');
const staticRoute = require('./routes/v1/static-routes');

app.use(express.json());   //help to parse the incoming request body 
app.use(express.urlencoded({extended:true}));  

app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT, () => {
    console.log(`successfully started the server on port ${ServerConfig.PORT}`);
});
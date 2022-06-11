const express = require("express");
const expressConfig = require('./config/express');
const routerConfig = require('./config/routes');
const dataBaseConfig = require('./config/dataBase');


start();

async function start() {
    const app = express();

    expressConfig(app);
    await dataBaseConfig(app);
    routerConfig(app)
   
    

    app.listen(3000, ()=> console.log('Server running on port 3000'));
}

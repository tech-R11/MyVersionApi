const validation = require("./startup/validation");
const express=require('express');
const configuration = require("./startup/configuration");
const routeHandler = require("./startup/routeHandlers");
const mongoDb = require("./startup/mongoDbconnect");
const logging = require("./startup/logging");
const winston = require("winston");
const app = express();



configuration();
validation();
logging();
mongoDb();
routeHandler(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    winston.info(`server is running on port ${PORT}`);
})


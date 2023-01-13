const express = require('express')
const helmet = require("helmet")
const bodyParser = require('body-parser')
const cors = require('cors')
const useragent = require('express-useragent');
require('dotenv').config()

const app = express()

//CORS
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      credentials: true,
    })
  );
  

//Body parser for incoming request
app.use(bodyParser.json());


//Securing HTTP headers
app.use(helmet());


//Get user agent
app.use(useragent.express());

const orderRoute = require('./routes/order/order');

app.use('/api', orderRoute)

app.listen(process.env.PORT || 3000)

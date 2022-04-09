const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors')
//const database = require ('./api/configs/database.config').mogoURL;

//convert json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

require('./api/routers/user.router')(app);
require ('./api/routers/product.router')(app);
require ('./api/routers/category.router') (app);
//Connect DB
mongoose
    .connect(process.env.MONGODB_URL, {useNewUrlParser:true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Connect mongodb success');
    })
    .catch((err)=> {
        console.log(err);   
    })

app.listen(port, ()=>console.log('Server listening port '+ port));
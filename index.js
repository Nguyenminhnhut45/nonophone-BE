const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const database = require ('./api/configs/database.config').mogoURL;

//convert json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


require('./api/routers/user.router')(app);

require ('./api/routers/product.router')(app);
// const User= require('./api/models/user.model');
// const userPost = {
//     email: 'nhut09112000@gmail.com',
//     username: 'minhnhut1',
//     password: 'nguyenminhnhut',
//     sdt: '',
//     address: '',
//     role: 'admin',
// }
// const user= new User(userPost);
// user.save((err, data) =>{
//     if(err) console.log(err);
//     console.log(data);
// })





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
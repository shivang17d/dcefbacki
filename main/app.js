require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const homerouter = require('../routes/homerouter')
const careerrouter = require('../routes/careerrouter')
const clientsrouter = require('../routes/clientsrouter')
const contactusrouter = require('../routes/contactusrouter')
const productsrouter = require('../routes/productsrouter')
const bodyParser = require('body-parser');
const loginrouter = require('../routes/loginrouter')
const emailrouter = require('../routes/emailrouter')
const aboutusrouter = require('../routes/aboutusrouter')
const app = express();
const url = 'mongodb+srv://shivang17d:shivang17d@cluster0.usj9veo.mongodb.net/?retryWrites=true&w=majority';


// mongoose.connect(dbURI).then((result)=>{
//     app.listen(8080);

// }).catch((err)=>{
//     console.log(err)
// })
// mongoose.set('strictQuery',true)

// const url= "mongodb://0.0.0.0:27017/test";
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', function () {
    console.log("connected...")
});

app.listen(8080, function () {
    console.log("App is running")
});

mongoose.set('strictQuery', true)

var cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.json())

app.use('/Logincontent', loginrouter);

app.use('/homecontent', homerouter);

app.use('/aboutuscontent', aboutusrouter);

app.use('/careercontent', careerrouter);

app.use('/clientscontent', clientsrouter);

app.use('/contactuscontent', contactusrouter);

app.use('/productscontent', productsrouter);

app.use('/emailcontent', emailrouter);

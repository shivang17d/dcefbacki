const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactdetailsSchema = new Schema({
    mobile : {
        type : String
    },
    address : {
        type :String
    },
    email : {
        type : String
    }},{timestamps : true}
);

const contactSchema = new Schema({
    name : {
        type : String
    },
    email :{
        type :String
    },
    mobile :{
        type: String
    },
    message :{
        type : String
    }
},{timestamps : true}
);
const Contactdetails = mongoose.model('contactdetailslist',contactdetailsSchema);
const Contacts = mongoose.model('contactlist',contactSchema);
module.exports = {Contactdetails,Contacts};
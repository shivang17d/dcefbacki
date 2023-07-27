const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name :{
        type : String
    },
    city : {
        type : String
    },
    imgurl : {
        type : String
    },
    type :{
        type : String
    },
    coordinates :[{
        lat : {
            type :String
        },
        lon :{
            type : String
        }
}]
},{timestamps : true});

const Clients = mongoose.model('clientlist',clientSchema);
module.exports=Clients;
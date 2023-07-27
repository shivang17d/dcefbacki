const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const openingsSchema = new Schema(
    {
        title :{
            type : String
        },
        description :{
            type : String
        }

    },{timestamps : true}
)

const applicantSchema = new Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId 
        },
        email :{
            type : String
        },
        mobile :{
            type : String
        },
        name : {
            type : String
        },
        experience :{
            type : String
        },

    },{timestamps : true}
)

const Openings = mongoose.model('openinglist',openingsSchema);
const Applicants = mongoose.model('applicantlist',applicantSchema);
module.exports = {Openings,Applicants};
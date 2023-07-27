const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const aboutusSchema = new Schema({
        _id :{
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId 
        },
        title : {
            type : String
        },
    },{timestamps : true}
);
const Aboutuss = mongoose.model('aboutuslist',aboutusSchema);
module.exports = Aboutuss;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
        _id :{
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId 
        },
        title : {
            type : String
        },
        description : {
            type : String
        },
        imgurl :{
            type : String
        },
        url :{
            type :String
        }
    },{timestamps : true}
);
const Products = mongoose.model('productlist',productSchema);
module.exports = Products;
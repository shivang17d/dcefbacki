const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HomeSchema = new Schema(
    {
        projectdone:{
            type : String
        },
        yearsofexperience:{
            type :String
        },
        totalemployes:{
            type :String
        }
    },{timestamps : true}
)

const Home = mongoose.model('homelist',HomeSchema);

module.exports = Home;
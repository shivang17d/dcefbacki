const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmailSchema = new Schema(
    {
        recipient:{
            type : String
        },
        subject:{
            type :String
        },
        attachment:{
            type :String
        },
        from:{
            type:String
        },
        isAttachment:{
            type:Boolean
        }
    },{timestamps : true}
)

const Email = mongoose.model('emaillist',EmailSchema);

module.exports = Email;
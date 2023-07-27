const express =require('express');
const Email=require('../model/Emailpage')
const sendEmail=require('../services/email')
const router = express.Router();
const path = require('path');
const currentDirectory = __dirname;
const fileDirectory= 'local_directory'

router.post('/sendemail',(req,res)=>{
    const recipient=req.body.recipient;
    const subject=req.body.subject;
    const body=req.body.message;
    const fileName=(req.body.filename===undefined)?"":req.body.filename;
    console.log(fileName)
    const filePath = path.resolve(fileDirectory,fileName);
    const isAttachment=req.body.isAttachment;
    const from=req.body.email;
    console.log(req.body)
    sendEmail(recipient,subject,body,filePath,isAttachment,from).then(()=>{
        res.sendStatus(200);
    }).catch((err)=>{
        res.send(err);
        
    });
    //console.log(filePath)
});

module.exports=router;

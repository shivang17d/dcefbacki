const express =require('express');
const Clients = require('../model/Clientpage');
const { Applicants } = require('../model/Careerpage');
const authenticateToken =require('../routes/authentication')

const router = express.Router();



router.get('/allclients',(req,res)=>{
    Clients.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/admin/addclient',authenticateToken,(req,res)=>{
    const { lat, lon } = req.body;
    const newclient = new Clients({
        name : req.body.name,
        city : req.body.city,
        imgurl : req.body.imgurl,
        type : req.body.companyType,
        coordinates :[{lat,lon}],
    });
    newclient.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});


router.delete('/admin/removeclient/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Clients.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeclients',authenticateToken,(req,res)=>{
    Clients.deleteMany({})
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

module.exports=router;
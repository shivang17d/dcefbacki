const express =require('express');
const Home = require('../model/Homepage');
const authenticateToken =require('../routes/authentication')
const router = express.Router();




router.post('/admin/addhomedata',authenticateToken,(req,res)=>{
    const newhome = new Home({
        projectdone : req.body.projectdone,
        yearsofexperience : req.body.yearsofexperience,
        totalemployes : req.body.totalemployes,
    });
    newhome.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/homedata',(req,res)=>{
    
    Home.find().then((result)=>{
        res.send(result);
    })
});


router.put('/admin/changehome/:id',authenticateToken,(req,res)=>{
    Home.findByIdAndUpdate(req.params.id,{
        projectdone : req.body.projectdone,
        yearsofexperience : req.body.yearsofexperience,
        totalemployes : req.body.totalemployes,
    }).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.delete('/admin/removehome/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Home.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});


module.exports=router;
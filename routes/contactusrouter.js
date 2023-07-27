const express =require('express');
const { Contacts,Contactdetails } = require('../model/Contactuspage');
//const {upload} = require('../model/Resumepage');
const Grid = require('gridfs-stream');
const { default: mongoose } = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const multer = require('multer');
const fs = require('fs-extra');
const authenticateToken =require('../routes/authentication')
const router = express.Router();

router.get('/getcontacts',(req,res)=>{
    Contacts.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/getcontactdetails',(req,res)=>{
    Contactdetails.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});
router.post('/admin/addcontactdetails',authenticateToken,(req,res)=>{
    const newconatct = new Contactdetails({
        mobile : req.body.mobile,
        address : req.body.address,
        email : req.body.email
    });
    newconatct.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/addcontact',(req,res)=>{
    const newconatct = new Contacts({
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        message : req.body.message
    });
    newconatct.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.put('/admin/updatecontact/:id',authenticateToken,(req,res)=>{
    Contactdetails.findByIdAndUpdate(req.params.id,{
        mobile : req.body.mobile,
        address : req.body.address,
        email : req.body.email
    }).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.delete('/admin/removecontact/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Contacts.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removecontacts',authenticateToken,(req,res)=>{
    Contacts.deleteMany({})
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removecontactdetail/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Contactdetails.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removecontactdetails',authenticateToken,(req,res)=>{
    Contactdetails.deleteMany({})
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

// router.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ file: req.file });
//   });

// router.get('/download/:filename', (req, res) => {
//     // console.log('id', req.params.id)
//     const file = gfs.files.find({
//         filename: req.params.filename
//       })
//       .toArray((err, files) => {
//         if (!files || files.length === 0) {
//           return res.status(404).json({
//             err: "no files exist"
//           });
//         }
//         gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//       });
//   });


module.exports=router;
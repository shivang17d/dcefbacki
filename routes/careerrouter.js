const express =require('express');
const { Openings, Applicants } = require('../model/Careerpage');
const authenticateToken =require('../routes/authentication')
const multer = require('multer');
const router = express.Router();
const mongoose= require('mongoose');
const path = require('path');
const fs = require('fs-extra');

router.post('/admin/createopening',authenticateToken,(req,res)=>{
    const newopening = new Openings({
        title : req.body.title,
        description : req.body.description
    });
    newopening.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    })
});

router.get('/openings',(req,res)=>{
    Openings.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.put('/admin/changeopening/:id',authenticateToken,(req,res)=>{
    Openings.findByIdAndUpdate(req.params.id,{
        title : req.body.title,
        url : req.body.description
    }).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/applicants',(req,res)=>{
    Applicants.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/apply',(req,res)=>{
    const newapplicant =new Applicants({
        _id   : new mongoose.Types.ObjectId(),
        email : req.body.email,
        mobile : req.body.mobile,
        name  : req.body.name,
        experience : req.body.experience,
        })
        newapplicant.save().then((result)=>{
            res.send(result);
        }).catch((err)=>{
            console.log(err);
        })
})

router.delete('/admin/removeopening/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Openings.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeapplicant/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    const currentDirectory = __dirname;
    const fileDirectory= '../main/local_directory'
    const fileName=id+'.pdf';
    const filePath = path.resolve(currentDirectory, fileDirectory,fileName);
    fs.unlink(filePath, function (err) {
        console.log(err);
    });
    Applicants.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeopenings',authenticateToken,(req,res)=>{
    Openings.deleteMany({})
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeapplicants',authenticateToken,(req,res)=>{
    const currentDirectory = __dirname;
    const fileDirectory= '../main/local_directory'
    const filePath = path.resolve(currentDirectory, fileDirectory);
    fs.unlink(filePath, function (err) {
        console.log(err);
    });
    Applicants.deleteMany({})
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), (req, res) => {
    // Get the uploaded file
    const file = req.file;

    console.log(file.path)
    // Create a local directory to store the file
    fs.ensureDirSync('local_directory');
  
    // Move the uploaded file to the local directory
    fs.moveSync(file.path, 'local_directory/' + file.originalname);
  
    // Send a response
    res.json({ message: 'File uploaded successfully' });
  });

  router.get('/download/:filename', (req, res) => {
    // Get the file name from the query string
    const fileName = req.params.filename;
  
    // Send the file as a download
    res.download('local_directory/' + fileName);
  });

module.exports=router;
const express =require('express');
const Aboutuss=require('../model/Aboutuspage')
const authenticateToken =require('../routes/authentication')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const mongoose= require('mongoose');

router.get('/allaboutus',(req,res)=>{
    Aboutuss.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/admin/createaboutus',authenticateToken,(req,res)=>{
    const newtimeline = new Aboutuss({
     _id   : new mongoose.Types.ObjectId(),
     title : req.body.title,
    }) ;
    newtimeline.save().then((result)=>{
     res.send(result);
    }).catch((err)=>{
     console.log(err);
    })
 });

 router.delete('/admin/removeaboutus/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Aboutuss.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeaboutuss',authenticateToken,(req,res)=>{
  const currentDirectory = __dirname;
    const fileDirectory= 'timeline_image'
    const filePath = path.resolve(fileDirectory);
    fs.unlink(filePath, function (err) {
        console.log(err);
    });
    Aboutuss.deleteMany({})
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
    fs.ensureDirSync('timeline_image');
  
    // Move the uploaded file to the local directory
    fs.moveSync(file.path, 'timeline_image/' + file.originalname);
  
    // Send a response
    res.json({ message: 'File uploaded successfully' });
  });

router.get('/download/:id', (req, res) => {
    fs.readdir('timeline_image', (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return res.sendStatus(500);
      }
  
      let fileName = null;
      files.forEach(file => {
        const fileNameWithoutExtension = String(file).split('.').slice(0, -1).join('.');
        if (fileNameWithoutExtension === req.params.id) {
          fileName = file;
          // Move the res.download statement here
          res.download('timeline_image/' + fileName);
        }
      });
  
      // Check if fileName is still null after the loop
      // This indicates that no matching file was found
      if (fileName === null) {
        res.sendStatus(404);
      }
    });
  });

module.exports=router;

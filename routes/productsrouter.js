const express =require('express');
const Products = require('../model/Productpage');
const authenticateToken =require('../routes/authentication')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const mongoose= require('mongoose');
const { resourceLimits } = require('worker_threads');

router.get('/allproducts',(req,res)=>{
    Products.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/admin/createproduct',authenticateToken,(req,res)=>{
   const newproduct = new Products({
    _id   : new mongoose.Types.ObjectId(),
    title : req.body.title,
    description : req.body.description,
    imgurl : req.body.imgurl,
    url : req.body.url
   }) ;
   newproduct.save().then((result)=>{
    res.send(result);
   }).catch((err)=>{
    console.log(err);
   })
});

router.put('/admin/updateproduct/:id',authenticateToken,(req,res,next)=>{
    Products.findByIdAndUpdate(req.params.id,{
    title : req.body.title,
    description : req.body.description,
    imgurl : req.body.imgurl,
    url : req.body.url
        }).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
});

router.delete('/admin/removeproduct/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Products.findByIdAndDelete(id)
    .then((result)=>{
        res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.delete('/admin/removeproducts',authenticateToken,(req,res)=>{
  const currentDirectory = __dirname;
  const fileDirectory= 'product_image'
  const filePath = path.resolve(currentDirectory, fileDirectory);
  fs.unlink(filePath, function (err) {
      console.log(err);
  });
    Products.deleteMany({})
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
    fs.ensureDirSync('product_image');
  
    // Move the uploaded file to the local directory
    fs.moveSync(file.path, 'product_image/' + file.originalname);
  
    // Send a response
    res.json({ message: 'File uploaded successfully' });
  });

router.get('/download/:id', (req, res) => {
    fs.readdir('product_image', (err, files) => {
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
          res.download('product_image/' + fileName);
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

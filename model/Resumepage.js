const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose= require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
// Connect to MongoDB and create GridFS stream
const MONGO_URI = 'mongodb+srv://Sameer123:sameer123@cluster0.tssquen.mongodb.net/Test?retryWrites=true&w=majority';
const conn = mongoose.createConnection(MONGO_URI);
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up storage engine
const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});
const upload = multer({ storage });

module.exports={upload,gfs}

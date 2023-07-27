require('dotenv').config()
const express =require('express');
const Login = require('../model/Loginpage');
const jwt = require('jsonwebtoken');

const secretKey = 'DCE_REF';
const bcrypt=require('bcryptjs');
const router = express.Router();

function generateToken(username) {
    const payload = { username };
    const options = { expiresIn: '1h' }; // Set an expiration time for the token
  
    return jwt.sign(payload, secretKey, options);
  }
function authenticateToken(req, res, next){
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log("secretkey="+secretKey)
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid, store the decoded information in the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  });
};

router.get('/admin/firstlogin',(req,res)=>{
  Login.find().then((arr)=>{
    res.send({count : arr.length})
  })
  .catch((err)=>{
    console.log(err)
  })
});

  router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
  console.log("secretkey="+process.env.SECRET_KEY)
    // Find the user with the provided username
    Login.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
  
        // Compare the password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          if (isMatch) {
            // Password is correct
            // Generate a JWT token
            const token = generateToken(username);
  
            // Send the token back to the client
            res.json({ token });
          } else {
            // Password is incorrect
            res.status(401).json({ error: 'Invalid username or password' });
          }
        
      })}
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  router.post('/admin/newLogin',(req,res)=>{
    const newlogin = new Login({
        username : req.body.username,
        password : req.body.password,
        
    });
    newlogin.save().then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
    });
  });

  module.exports=router;
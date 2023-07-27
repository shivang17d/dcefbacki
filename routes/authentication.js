const jwt = require('jsonwebtoken');
const secretKey = 'DCE_REF';


function authenticateToken(req, res,next){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      // Token is valid, store the decoded information in the request object
      req.user = decoded;
      // Proceed to the next middleware or route handler
      
    });
    next();
  };

module.exports=authenticateToken;
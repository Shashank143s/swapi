var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');

router.post('/', (request,response)=>{
    let username = request.body.username;
    let password = request.body.password;
    if(username === 'admin' && password === 'admin'){
      //creating payload to be saved with the token generation
      const payload = {
        username : request.body.username
      };
      //synchronous call to jwt.sign() method to generate the token
      //secretSauce needs to be setup via app.set/get
      var token = jwt.sign(payload, 'LukeIAmYourFather',{
        expiresIn: "10h"
      });
      //Now return the response with the token
      response.json({ message : "Login successful!!" , token : token });
    }
    else
      response.json({ message : "Login unsuccessful!!"});
});

module.exports = router,app;

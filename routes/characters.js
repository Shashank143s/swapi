var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
//Models Import Statements
var Character = require('../models/character');

//Route Middleware for token setup and validation
router.use(function(request,response,next){
  console.log(" Middleware execution!!");
  var token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers['authorization'].split(' ')[1];
  console.log(request.headers['authorization'].split(' ')[1]);
  //check for token
  if(token){
    jwt.verify(token, 'LukeIAmYourFather', (error , decoded)=>{
      if(error){
        response.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else{
        console.log('token verified!!!');
        request.decoded = decoded;
        next();
      }
    });
  }
  else{
    response.status(403).send({ message: 'No token provided.' });
  }
});
//Creating a controller or as we call registering a route for GET and POST routes
var charRoutes = router.route('/');
//Creating a controller or as we call registering a route for PUT and DELETE routes
var amendRoutes = router.route('/:name');
//reading all the stored charcters from the database(READ)
charRoutes.get((request,response)=>{
  Character.find((err,charac)=>{
    if(err){
      console.log(err);
      response.json(err);
    }
    else
      response.json(charac);
  });
});

//creating a new character(CREATE)
charRoutes.post((request,response)=>{
  var character = new Character();
  character.name = request.body.name;
  character.gender = request.body.gender;
  character.height = request.body.height;
  character.birthYear = request.body.birthYear;
  character.mass = request.body.mass;
  character.save((err)=>{
    if(err)
      console.log(err);
    else
       response.json({ message: 'A new character was added!', data: character });
  });

});

//creating a route to update a saved character
amendRoutes.put((request,response)=>{
  Character.findOne({ name : request.params.name } ,(err,character)=>{
    if(err){
      console.log(err);
    }
    character.name = request.body.updatedName; //create an input field with name attribute as updatedName
    character.save();
    response.json({ message: 'Character updated!', data: character });
  });
});

//creating a route to delete a character
amendRoutes.delete((request,response)=>{
  Character.findOneAndRemove({ name : request.params.name }, function(err,character){
    if (err)
      res.send(err);
    else {
      response.json({ message: 'Character removed!', data: character });
    }
  });
});

module.exports = router;

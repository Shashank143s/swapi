var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //serve the index.html files
  //place the build/dist folder after generating the .js code
  res.sendFile('/prodBuild/index.html');
});

module.exports = router;

var express = require('express');
var router = express.Router();

// Setting up environment variables
const dotenv = require('dotenv');
dotenv.config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Psintegra - API' });
});

module.exports = router;

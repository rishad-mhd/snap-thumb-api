var express = require('express');
const getById = require('../controllers/users/getById');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/user', getById);


module.exports = router;

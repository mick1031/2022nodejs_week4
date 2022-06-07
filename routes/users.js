var express = require('express');
var router = express.Router();
const userSuccessHandle = require('../handle/user/userSuccessHandle');
const User = require('../models/UserSchema');

router.get('/', async (req, res, next) => {
  await userSuccessHandle(res);
});

router.options('/', function (req, res, next) {
  res.status(200).send("");
});

module.exports = router;

var express = require('express');
var router = express.Router();
const userErrorHandle = require('../handle/user/userErrorHandle');
const userSuccessHandle = require('../handle/user/userSuccessHandle');
const User = require('../models/UserSchema');

router.get('/', async (req, res, next) => {
  await userSuccessHandle(res);
});

router.post('/', async (req, res, next) => {
  try {
    const model = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
    };

    await User.create(model);
    await userSuccessHandle(res);
  } catch (error) {
    userErrorHandle(res);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
    };
    const result = await User.findByIdAndUpdate(id, model, { runValidators: true });
    if (result) {
      await userSuccessHandle(res);
    } else {
      userErrorHandle(res);
    }
  } catch (error) {
    userErrorHandle(res);
  }

});

router.delete('/', async (req, res, next) => {
  if (req.originalUrl == '/posts/') {
    userErrorHandle(res);
  } else {
    await User.deleteMany({});
    await userSuccessHandle(res);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (result) {
      await userSuccessHandle(res);
    } else {
      userErrorHandle(res);
    }
  } catch (error) {
    userErrorHandle(res);
  }
});

router.options('/', function (req, res, next) {
  res.status(200).send("");
});

module.exports = router;

var express = require('express');
var router = express.Router();
const postErrorHandle = require('../handle/post/postErrorHandle');
const postSuccessHandle = require('../handle/post/postSuccessHandle');
const Post = require('../models/PostSchema');

router.get('/', async (req, res, next) => {
    const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? { 'content': new RegExp(req.query.q) } : {};
    await postSuccessHandle(res, {q, timeSort});
});

router.post('/', async (req, res, next) => {
    try {
        const model = {
            user: "629f4fb6b5179025df75e85c",
            image: req.body.image,
            content: req.body.content
        };

        await Post.create(model);

        await postSuccessHandle(res, {});
    } catch (error) {
        console.log(error);
        postErrorHandle(res);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const model = {
            image: req.body.image,
            content: req.body.content,
        };
        const result = await Post.findByIdAndUpdate(id, model, { runValidators: true });
        if (result) {
            await postSuccessHandle(res);
        } else {
            postErrorHandle(res);
        }
    } catch (error) {
        postErrorHandle(res);
    }
});

router.delete('/', async (req, res, next) => {
    if (req.originalUrl == '/posts/') {
        postErrorHandle(res);
    } else {
        await Post.deleteMany({});
        await postSuccessHandle(res);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Post.findByIdAndDelete(id);
        if (result) {
            await postSuccessHandle(res);
        } else {
            postErrorHandle(res);
        }
    } catch (error) {
        postErrorHandle(res);
    }
});

router.options('/', function (req, res, next) {
    res.status(200).send("");
});

module.exports = router;

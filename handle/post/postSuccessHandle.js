const Post = require('../../models/PostSchema');

async function postSuccessHandle(res, options) {
    
    if(options.q === undefined){
        options.q = {};
    }

    if(options.timeSort === undefined) {
        options.timeSort = '-createdAt';
    }

    const data = await Post.find(options.q)
        .populate({
            path: 'user',
            select: 'name photo'
        }).sort(options.timeSort)

    res.status(200)
        .json({
            status: "success",
            data: data,
        });
}

module.exports = postSuccessHandle;
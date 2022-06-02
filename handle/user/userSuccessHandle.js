const User = require('../../models/UserSchema');

async function userSuccessHandle(res) {
    const data = await User.find();

    res.status(200)
        .json({
            status: "success",
            data: data,
        });
}

module.exports = userSuccessHandle;
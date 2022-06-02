function userErrorHandle(res) {
    res.status(404)
        .json({
            status: false,
            message: "欄位未填寫正確，或無此 user id"
        });
}

module.exports = userErrorHandle;
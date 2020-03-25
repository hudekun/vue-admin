const jwt = require("jsonwebtoken");

const secret = "aaabbbfadwesooweiiaf";

function createToken(payload) {
    payload.rtiem = new Date();
    payload.exp = 60 * 60 * 2 * 1000;
    return jwt.sign(payload, secret);
}

function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject("token验证失败");
            }
        })
    })
}
module.exports = {
    createToken,
    checkToken
}
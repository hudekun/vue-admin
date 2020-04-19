var express = require('express');
var router = express.Router();
var blogSchema = require('../db/users.js')
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.post('/login', function(req, res, next) {
    console.log(req.body.username)
    blogSchema.find({ username: req.body.username }, function(error, docs) {
        console.log(docs);
        if (docs.length > 0) {
            // console.log('success');
            const token = jwt.sign({
                    name: req.body.username, //需要放到token的参数
                    exp: Math.floor(Date.now() / 1000) + 3600 * 3,
                },
                'suzhen', //随便一点内容，加密的密文，私钥对应着公钥
            )
            res.json({ status: '200', tokenI: token, username: req.body.username, img: docs[0]['img'], msg: '欢迎' });
        } else {
            res.json({ status: '204', msg: '查无此人' });
        }
    })

});
router.post('/loginRegist', function(req, res, next) {
    //console.log(req.body);
    blogSchema.find({ username: req.body.username }, function(error, docs) {
        if (docs.length > 0) {
            res.json({ status: '201', msg: '该用户已注册' });
        } else {
            blogSchema.insertMany([{ username: req.body.username, password: req.body.password, emilNum: req.body.emilNum }], function(error, docs) {
                console.log(docs);

                if (docs.length > 0) {
                    res.json({ status: '200', msg: 'success' });
                }
            })
        }

    })

});
router.post('/avatar', function(req, res, next) {
    blogSchema.update({ "username": req.body.name }, { "img": req.body.img }, function(error, docs) {
        if (error) return handleError(error);
        if (docs.nModified > 0) {
            res.json({ info: 'success' })
        }
    })
})

module.exports = router;
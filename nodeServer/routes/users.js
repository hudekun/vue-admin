var express = require('express');
var router = express.Router();
var blogSchema = require('../db/users.js')
var jwt = require('jsonwebtoken')
    // const { createToken, checkToken } = require('../jwt/index.js')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    // blogSchema.insertMany([{ username: 'hudekun', password: '123' }], function(error, docs) {
    //     console.log(docs);
    //     res.json({ msg: 'success', data: docs });
    // })
    var token = req.headers.authorization
    checkToken(token).then(res => {
        //token验证成功
        res.json({ msg: 'success', data: res });
        //判断过期时间
    }).catch(err => {
        res.json({ err: -1, msg: 'token非法' })
    })

});
router.post('/login', function(req, res, next) {
    console.log(req.body.username)
    blogSchema.find({ username: req.body.username }, function(error, docs) {
        console.log(docs);

        if (docs.length > 0) {
            // console.log('success');
            const token = jwt.sign({
                    name: req.body.username, //需要放到token的参数
                    exp: Math.floor(Date.now() / 1000) + 30,
                },
                'suzhen', //随便一点内容，加密的密文，私钥对应着公钥
            )
            res.json({ status: '200', tokenI: token, username: req.body.username });
        } else {
            res.json({ status: '200', msg: '查无此人' });
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

module.exports = router;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./db/connent.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//jwt
const jwt = require('jsonwebtoken');
//var secret = "dsfjios"


app.use(async(req, res, next) => {
    // let { url = '' } = ctx
    console.log(req.url.indexOf('/users/login'));

    if (req.url.indexOf('/users/login') == -1) { //除去登陆，注册，找回密码等接口其他的都需要验证
        //需要校验登录态
        // console.log(req.headers)
        if (!req.headers.authorization) {
            return res.json({
                status: 401,
                err: '无效token'
            })
        } else {
            try {
                let token = await jwt.verify(
                        req.headers.authorization,
                        'suzhen'
                    )
                    // console.log(token)

                //console.log(token.name)
                if (token.name) await next()
                else {
                    return res.json({
                        status: 401,
                        err: '无效token'
                    })
                }
            } catch (error) {
                console.log(error)
                return res.json({
                    status: 401,
                    err: '无效token'
                })
            }
        }
    } else {
        await next()
    }
})

//定义一个接口，返回token给客户端
app.get('/getUserInfo', function(req, res) {
    var username = 'admin'
    var token = jwt.sign({ name: username }, secret, {
        expiresIn: 900 // token 过期销毁时间设置
    });
    res.json({
        token: token
    })
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
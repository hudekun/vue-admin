var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./db/connent.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article.js');

var app = express();

//jwt
const jwt = require('jsonwebtoken');
//var secret = "dsfjios"


app.use(async(req, res, next) => {
    var reg = req.originalUrl.split('/');
    if (req.url === '/users/login' || reg['1'].indexOf('upload') != -1) {
        console.log('白名单');
        await next()
    } else {
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
    }


})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);

const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads' })
app.post('/upload', upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
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
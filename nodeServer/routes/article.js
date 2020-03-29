var express = require('express');
var router = express.Router();
var Article = require('../db/article.js')

router.post('/submit', function(req, res, next) {
    const content = req.body.content
    const name = req.body.name
    console.log(name);
    Article.insertMany({ data: content, name: name }, function(error, docs) {
        if (!error) {
            res.json({ status: '200', msg: 'success' });
        }
    })
})
router.get('/query', function(req, res, next) {
    console.log(req.query);

    if (req.query.id) {
        Article.find({ "_id": req.query.id }, function(error, docs) {
            if (docs.length > 0) {
                res.json({ status: '200', data: docs });
            }
        })
    } else {
        Article.find(function(error, docs) {
            if (docs.length > 0) {
                res.json({ status: '200', data: docs });
            }
        })
    }
})

module.exports = router;
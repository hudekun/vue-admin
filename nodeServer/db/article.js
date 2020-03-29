var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    data: String,
    name: String
});
var Article = mongoose.model('articles', blogSchema);
module.exports = Article
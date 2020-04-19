var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    username: String,
    password: String,
    emilNum: String,
    img: String
});
var Blog = mongoose.model('userlist', blogSchema);
module.exports = Blog
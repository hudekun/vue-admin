var mongoose = require('mongoose');
var blogSchema = mongoose.Schema({
    username: String,
    password: String,
    emilNum: String
});
var Blog = mongoose.model('students', blogSchema);
module.exports = Blog
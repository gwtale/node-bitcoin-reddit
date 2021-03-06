// consider using brianc/node-pg-query
// https://github.com/brianc/node-pg-query

var db = require('../db');
var query = db.query;

exports.findAll = function (callback) {

    var text = 'SELECT * FROM "posts"';
    var values = null;

    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};

exports.findById = function (id, callback) {

    var text = 'SELECT * FROM "posts" WHERE id = $1';
    var values = [id];

    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};


exports.create = function (post, callback) {
    var text = 'INSERT INTO "posts" (title, text, url, timestamp, forum, username) VALUES ($1, $2, $3, $4, $5, $6);';
    var values = [post.title, post.text, post.url, post.timestamp, post.forum, post.username];

    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};


exports.findAll = function (callback) {
    var text = 'SELECT * FROM "posts" ORDER BY timestamp DESC LIMIT 3';
    var values = [];
    query(text, values, function(err, res) {
        callback(err, res ? res.rows : null)
    });
};

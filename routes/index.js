var express = require('express');
var router = express.Router();

var controller = require('../controllers');

var Post = require('../models/post');
var User = require('../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serialize());
passport.deserializeUser(User.deserialize());

/* GET home page. */
router.get('/', function(req, res, next) {

  // list index posts / front page posts
  Post.findAll(function(err, posts) {
      console.log(posts);
      if (err) {
          return (next(err));
      }

      res.render('index', {
          title: 'Express',
          user: req.user || null,
          posts: posts || null
      });
  });

});

router.post('/signup', passport.authenticate('local'), controller.user.create);

// submit a new post
router.get('/submit', function(req, res, next) {

    if (!req.user) {
        return res.redirect('/join');
    }

    res.render('submit', {
        title: 'submit',
        user: req.user
    });
});

router.get('/join', function(req, res, next) {
    res.render('join', {
        title: 'users',
        user: null
    });
});




router.post('/deposit', controller.payment.createDeposit);





module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync (async (req, res) => {
    try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    /* Sign in user after registration */
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds');
    })
    } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash('success', "Goodbye!");
      res.redirect('/campgrounds');
    });
  });

module.exports = router;
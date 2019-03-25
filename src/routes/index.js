const express = require('express'),
    router = express.Router(),
    //redirects to login page if authentication was unsuccessful
    isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    };

//returns a router which uses declared passport object
//some routes use authentication middleware
module.exports = (passport) => {
    router.get('/', isAuthenticated, (req, res) => {
        res.redirect('/profile');
    });

    /* GET profile Page */
    router.get('/profile', isAuthenticated, (req, res) => {
        res.render('profile', {user: req.user});
    });

    /* GET login page. */
    router.get('/login', (req, res) => {
        // Display the Login page with any flash message, if any
        res.render('login', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', (req, res) => {
        res.render('signup',{ message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET profile Page */
    router.get('/profile', isAuthenticated, (req, res) => {
        res.render('profile', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};
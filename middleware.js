module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        /* returnTo redirects the user back to the original URL */
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

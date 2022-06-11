module.exports = () => (req, res, next) => {
    if (req.session.user) {
        console.log(res.local);
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }
    next();
}
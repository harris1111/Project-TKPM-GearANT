export default async function auth(req, res, next) {
    req.session.retUrl = req.originalUrl;

    if (req.session.auth === false) {
        req.session.retUrl = req.originalUrl;
        return res.redirect('/login');
    } else {
        if (!req.session.isAdmin) {
            return res.redirect('/');
        }
    }
    next();
}
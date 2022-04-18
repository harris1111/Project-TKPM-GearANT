export default async function auth(req, res, next) {
    req.session.retUrl = req.originalUrl;

    if (req.session.auth === false) {
        req.session.retUrl = req.originalUrl;
        return res.redirect('/login');
    } else {
        if(req.session.authUser.Type==='2'){
            req.session.isAdmin = true
        }
    }
    next();
}
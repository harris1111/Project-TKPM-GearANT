export default async function auth(req, res, next) {
    req.session.retUrl = req.originalUrl;

    if (req.session.auth === false) {
        req.session.retUrl = req.originalUrl;
        return res.redirect('/login');
    } else {
        // let type = req.session.authUser.Type;
        // if (type === '2' && reqTime == null) {
        //     req.session.bidder = true;
        //     req.session.requested = false;
        // } else{
        //     req.session.bidder = false;
        // }
        // res.locals.bidder = req.session.bidder;
    }
    next();
}
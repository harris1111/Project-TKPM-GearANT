import categoryModel from '../models/cat.model.js';
import userModel from '../models/user.model.js';


export default function (app) {
    app.use(async function (req, res, next) {
        if (typeof (req.session.auth) === 'undefined') {
            req.session.auth = false;
        }
        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;

        res.locals.isAdmin = req.session.isAdmin
        next();
    });

    app.use(async function (req, res, next) {
        let lcCategories = await categoryModel.findAllWithDetails();
        for (let i in lcCategories) {
            let category = lcCategories[i];
            lcCategories[i].childCat = await categoryModel.findFromBigCategory(category.BigCatID);
        }
        res.locals.lcCategories = lcCategories;

        if (req.session.auth) {
            let cartSum = await userModel.findCartSum(req.session.authUser.Username)
            res.locals.cartSum = cartSum['SumStock']
        }

        next();
    });
}
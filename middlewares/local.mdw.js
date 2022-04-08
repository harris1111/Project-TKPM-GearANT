import categoryModel from '../models/cat.model.js';

export default function(app) {
    app.use(async function(req, res, next) {
        if (typeof(req.session.auth) === 'undefined') {
            req.session.auth = false;
        }
        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;

        console.log(req.session.authUser)
        console.log(res.locals.authUser)
        next();
    });

    app.use(async function(req, res, next) {
        let lcCategories = await categoryModel.findAllWithDetails();
        for (let i in lcCategories) {
            let category = lcCategories[i];
            lcCategories[i].childCat = await categoryModel.findFromBigCategory(category.BigCatID);
        }
        res.locals.lcCategories = lcCategories;

        //console.log(res.locals.lcCategories)
        next();
    });
}
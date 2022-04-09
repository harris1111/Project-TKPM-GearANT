import { engine, create } from 'express-handlebars';
import numeral from 'numeral';
import moment from 'moment';
import handlebars_sections from "express-handlebars-sections";

export default function(app) {
    app.engine('hbs', engine({
        defaultLayout: 'layout.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0');
            },
            format_date(val) {
                return moment(val).format('DD-MM-YYYY, hh:mm:ss');
            },

            format_no_h(val) {
                return moment(val).format('DD-MM-YYYY');
            },
            section: handlebars_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}
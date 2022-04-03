import { engine, create } from 'express-handlebars';
import numeral from 'numeral';
import moment from 'moment';
import handlebars_sections from "express-handlebars-sections";

export default function (app) {
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
            format_relative(val) {
                if(val - moment.now() < 0)
                    return 'Time Out';
                else{
                    const endDate = moment(val);
                    if(val - moment.now()  < 259200000) {
                        return endDate.from(moment());
                    }
                    else
                        return "End: " + endDate.format("DD/MM/YYYY");
                }
                //     return moment().from(val);
            },
            format_name(val) {
                const arr = val.split(" ");
                return "*****" + arr[arr.length - 1];
            },
            section: handlebars_sections()
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}

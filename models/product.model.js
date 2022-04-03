import db from '../utils/db.js';

export default {
    async findBestSeller(bigid) {
        const sql = `select SUM(od.Stock) as StockSum, p.*
                     from order_detail od join product p
                                               on od.ProID = p.ProID
                                          join category c
                                               on c.CatID=p.CatID
                                          join big_category b
                                               on c.BigCat = b.BigCatID
                     where b.BigCatID=${bigid}
                     group by p.ProID
                     order by StockSum DESC
                         limit 5`;
        const raw = await db.raw(sql);
        return raw[0];
    }
}

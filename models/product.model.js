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
    },

    async  findByID(id){
        const sql = `select * from product p
                        join category c
                        on c.CatID = p.CatID
                        join big_category b
                        on c.BigCat = b.BigCatID
                        where ProID = ${id}`

        const raw = await db.raw(sql);
        return raw[0][0];
    },

    async  findByCatID(catid, proid){
        const sql = `select * from product
                     where CatID = ${catid} and ProID!=${proid}
                    limit 4 offset 0`

        const raw = await db.raw(sql);
        return raw[0];
    }
}

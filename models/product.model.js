import db from '../utils/db.js';

export default {
    async findBestSeller(bigid) {
        const sql = `select SUM(od.Stock) as StockSum, p.*
                     from order_detail od
                              join product p
                                   on od.ProID = p.ProID
                              join category c
                                   on c.CatID = p.CatID
                              join big_category b
                                   on c.BigCat = b.BigCatID
                              join order_list ol on od.OrderID = ol.OrderID
                     where b.BigCatID = ${bigid}
                       and ol.State = 4
                     group by p.ProID
                     order by StockSum DESC limit 5`;
        const raw = await db.raw(sql);
        return raw[0];
    },

    async findByID(id) {
        const sql = `select *
                     from product p
                              join category c
                                   on c.CatID = p.CatID
                              join big_category b
                                   on c.BigCat = b.BigCatID
                     where ProID = ${id}`

        const raw = await db.raw(sql);
        return raw[0][0];
    },

    async findByCatID(catid, proid) {
        const sql = `select *
                     from product
                     where CatID = ${catid}
                       and ProID!=${proid}
                         limit 4
                     offset 0`

        const raw = await db.raw(sql);
        return raw[0];
    },

    async countBigCatId(bigCatId) {
        const sql = `select count(p.ProID) as amount
                     from product p
                              join
                          (category c join big_category b
                              on c.BigCat = b.BigCatID)
                          on p.CatID = c.CatID
                     where b.BigCatID = ${bigCatId}
                       and p.ProState = true`;
        const raw = await db.raw(sql);
        return raw;
    },

    async countCatId(catId) {
        const sql = `select count(p.ProID) as amount
                     from product p
                              join
                          category c 
                          on p.CatID = c.CatID
                     where c.CatID = ${catId}
                       and p.ProState = true`;
        const raw = await db.raw(sql);
        return raw;
    },

    async findPageByBigCatId(bigCatId, limit, offset) {
        const sql = `select *
                     from product p
                              join category c on p.CatID = c.CatID
                              join big_category b on c.BigCat = b.BigCatID
                     where b.BigCatID = ${bigCatId}
                         limit ${limit}
                     offset ${offset}`;
        const raw = await db.raw(sql);
        return raw[0];
    },

    async findPageByCatId(catId, limit, offset) {
        const sql = `select *
                     from product p
                              join category c on p.CatID = c.CatID
                              where c.CatID = ${catId}
                         limit ${limit}
                     offset ${offset}`;
        const raw = await db.raw(sql);
        return raw[0];
    },
}

import db from '../utils/db.js';

export default {
    async findCatID(Cat) {
        const sql = `select CatID
                     from category c
                     where c.CatName = '${Cat}'`;
        const raw = await db.raw(sql);
        return raw[0][0].CatID;
    },

    async updateProduct(entity) {
        const proid = entity.ProID;
        delete entity.ProID;
        return db('product').where('ProID', proid).update(entity);
    },

    async findBigCatID(ProID) {
        const sql = `select b.BigCatID
                     from product p
                              join category c on p.CatID = c.CatID join big_category b
                     on c.BigCat = b.BigCatID
                     where p.ProID = '${ProID}'`;
        const raw = await db.raw(sql);
        return raw[0][0].BigCatID;
    },

    async findAllLimit(limit, offset) {
        return db.select().from('product').limit(limit).offset(offset);
    },


    async countProduct() {
        const list = await db.select().from('product').count({ amount: 'ProID' });
        return list[0].amount;
    },

    async addProduct(entity) {
        return db('product').insert(entity);
    },

    async countByKW(name) {
        const sql = `SELECT count(*) as amount
                     FROM product p
                     WHERE MATCH (ProName)
                         AGAINST('${name}')`;
        const raw = await db.raw(sql);
        return raw[0][0].amount;
    },

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
                       and ol.State = 3
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

    async findAllLimitBig(limit, offset) {
        const sql = `select *
                     from product p
                              join category c
                                   on c.CatID = p.CatID
                              join big_category b
                                   on c.BigCat = b.BigCatID
                                   order by ProID
                         limit ${limit}
                     offset ${offset}`

        const raw = await db.raw(sql);
        return raw[0];
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

    async findByBigCatID(id, proid) {
        const sql = `select *
                     from product p
                              join category c
                                   on p.CatID = c.CatID
                              join big_category b
                                   on c.BigCat = b.BigCatID
                     where b.BigCatID = ${id}
                       and p.ProID!=${proid}
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
                     where b.BigCatID = ${bigCatId} limit ${limit}
                     offset ${offset}`;
        const raw = await db.raw(sql);
        return raw[0];
    },

    async findPageByKW(name, limit, offset) {
        const sql = `select *
                     from product p
                     WHERE MATCH (ProName)
                         AGAINST('${name}')
                         limit ${limit}
                     offset ${offset}`;
        const raw = await db.raw(sql);
        return raw[0];
    },

    async findPageByCatId(catId, limit, offset) {
        const sql = `select *
                     from product p
                              join category c on p.CatID = c.CatID
                     where c.CatID = ${catId} limit ${limit}
                     offset ${offset}`;
        const raw = await db.raw(sql);
        return raw[0];
    },

    async findSold(proid) {
        const sql = `select sum(od.Stock) as Sold
                     from order_list ol
                              join order_detail od on ol.OrderID = od.OrderID
                     where od.ProID = ${proid}
                     group by od.ProID
        `;
        const raw = await db.raw(sql);
        return raw[0][0] || { Sold: 0 };
    },
}
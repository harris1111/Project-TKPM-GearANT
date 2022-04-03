import db from '../utils/db.js';

export default {
    async findBigCategoryName(bigCatID) {
        const sql = `select BC.BigCatName
                     from big_category as BC
                     where BC.BigCatID = ${bigCatID}`;
        const list = await db.raw(sql);
        return list[0];
    },

    //return cat ifo that is of the bigCatID
    async findFromBigCategory(bigCatID) {
        const list = await db.select('*').from('category')
            .join('big_category', {'category.BigCat': 'big_category.BigCatID'})
            .where('big_category.BigCatID', bigCatID);
        return list;
    },

    //return catid, name, bigcatid of it, bigcatname of it, procount
    async findAllCat() {
        const sql = `select c.*, b.BigCatName, count(p.ProID) as ProCount
                     from category c
                              join big_category b
                                   on b.BigCatID = c.BigCat
                              left join product p on c.CatID = p.CatID
                     group by c.CatID, c.CatName`;
        const list = await db.raw(sql);
        return list[0];
    },


    //return bigcatid, name, product count
    async findAllWithDetails() {
        const sql = `select b.*, count(p.ProID) as ProCount
                     from product p
                              right join
                          (category c right join big_category b
                              on c.BigCat = b.BigCatID)
                          on p.CatID = c.CatID
                     group by b.BigCatID, b.BigCatName`;
        const list = await db.raw(sql);
        return list[0];
    },

    async countProductByCat(catId) {
        const sql = `select c.*, count(p.ProID) as ProCount
                     from product p
                              join
                          category c
                          on p.CatID = c.CatID
                     where c.CatID = ${catId}
                     group by c.CatID, c.CatName`;
        const list = await db.raw(sql);
        return list[0];
    },

    async updateBigCat(entity) {
        const id = entity.BigCatID;
        delete entity.BigCatID;
        return db('big_category').where('BigCatID',id).update(entity);
    },

    async updateCat(entity) {
        const id = entity.CatID;
        delete entity.CatID;
        return db('category').where('CatID',id).update(entity);
    },

    async delBigCat(id){
        return db('big_category').where('BigCatID',id).del();
    },

    async delCat(id){
        return db('category').where('CatID',id).del();
    },

    async addBigCat(entity){
        return db('big_category').insert(entity);
    },

    async addCat(entity){
        return db('category').insert(entity);
    }
}
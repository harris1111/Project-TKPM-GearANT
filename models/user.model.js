import db from '../utils/db.js';

export default {
    async findById(id) {
        const list = await db('user').where('id', id);
        if (list.length === 0)
            return null;

        return list[0];
    },

    async findOrderList(username) {
        const sql = `select ol.OrderID, User, Date, State, od.ProID, p.ProName, Price, od.Stock
                     from order_list ol
                         join order_detail od
                     on ol.OrderID = od.OrderID
                         join product p on od.ProID = p.ProID
                     where User = '${username}'
                     order by State, Date desc`;
        const raw = await db.raw(sql);
        return raw[0] || null
    },

    async findCart(username) {
        const sql = `select c.User, c.Stock as StockCart, Date, d.*
                     from cart c
                         join user u
                     on c.User = u.Username
                         join product d on c.ProID = d.ProID
                     where User = '${username}'
                     order by Date desc`;
        const raw = await db.raw(sql);
        return raw[0] || null
    },

    async addCart(entity) {
        return db('cart').insert(entity);
    },

    async addOrder(entity) {
        return db('order_list').insert(entity);
    },

    async findRecentOrder(username) {
        const sql = `select OrderID
                     from order_list
                     where User = '${username}'
                     order by Date desc limit 1`;
        const raw = await db.raw(sql);
        return raw[0][0].OrderID || null
    },

    async findCartSum(username) {
        const sql = `select sum(StockCart) as SumStock
                     from (
                              select c.User, c.Stock as StockCart, d.*
                              from cart c
                                       join user u on c.User = u.Username
                                       join product d on c.ProID = d.ProID
                          ) as detail
                     where User = '${username}'`;
        const raw = await db.raw(sql);
        return raw[0][0] || null
    },

    async findByUsername(username) {
        const list = await db('user').where('username', username);
        if (list.length === 0)
            return null;

        return list[0];
    },

    add(entity) {
        return db('user').insert(entity);
    },


    async delCart(user,proid) {
        return db('cart')
            .where({
                'User': user,
                'ProID': proid
            })
            .del();
    },

    update(entity) {
        const user = entity.Username;
        delete entity.Username;

        return db('user')
            .where('Username', user)
            .update(entity);
    }
}
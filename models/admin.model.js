import db from '../utils/db.js';
import productModel from '../models/product.model.js';

export default {
    async delProduct(id) {
        await db('product').where('ProID', id).del();
    },
    async addProduct(entity) {
        return db('product').insert(entity);
    },
    async editProduct(entity) { 
        const id = entity.id;
        delete entity.id;
        return db('product').where('ProID', id).update(entity);
    },
    async updateStateOrder(entity) { 
        const id = entity.orderID;
        delete entity.orderID;
        return db('order_list').where('OrderID', id).update(entity);
    },
    async getOrderList() { 
        const sql = `select od.Stock,ol.User,ol.Date,pd.ProName 
        from order_list ol 
        left join order_detail od on ol.OrderID = od.OrderID 
        left join product pd on od.ProID = pd.ProID;
        `
        const ret = await db.raw(sql);
        return ret[0];
    },
    async getUserList() {
        const sql = `SELECT username, address, number from user`;
        const ret = await db.raw(sql);
        return ret[0];
    }
}
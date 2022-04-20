import db from '../utils/db.js';
import productModel from '../models/product.model.js';

export default {
    async updateAdmin(entity) {
        const username = res.Username;
        delete entity.Username;
        return db('order_list').where('username', username).update(entity);
    },
    async delOrder(id) {
        await db('order_list').where('OrderID', id).del();
    },
    async delProduct(id) {
        await db('product').where('ProID', id).del();
    },
    async addProduct(entity) {
        return db('product').insert(entity);
    }
}
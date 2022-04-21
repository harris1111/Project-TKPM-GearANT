import db from '../utils/db.js';
import productModel from '../models/product.model.js';

export default {
    async delOrder(id) {
        await db('order_list').where('OrderID', id).del();
    },
    async delProduct(id) {
        await db('product').where('ProID', id).del();
    },
    async addProduct(entity) {
        return db('product').insert(entity);
    },
    async updateStateOrder(entity) { 
        const username = entity.Username;
        delete entity.Username;
        return db('order_list').where('User', username).update(entity);
    }
}
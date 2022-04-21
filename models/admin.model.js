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
    }
}